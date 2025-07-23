'use server'
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";


export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions") // 
    .insert([{ ...formData, author }]) 
    .select();

  if (error) {
    return (error.message)
  }

  return data[0];
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;
}


export const getCompanion = async( id :string ) => {
  const supabase =createSupabaseClient();

  const { data , error } = await supabase.from('companions').select().eq('id',id);
   if(error) return console.log(error);

   return data[0];
   
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) return(error.message);

    return data;
}



export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) return(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    
    
   
    return []; 
  }

  return data.map(({ companions }) => companions);
};

interface GetUserCompanionsParams {
  page?: number;
  limit?: number;
  subject?: string;
  topic?: string;
}

export const getUserCompanions = async (
  userId: string,
  { page = 1, limit = 10, subject, topic }: GetUserCompanionsParams = {}
) => {
  const supabase = createSupabaseClient();

  let query = supabase
    .from("companions")
    .select("*")
    .eq("author", userId); 

 
  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

 
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to).order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) return(error.message)
  return data;
};

export const deleteCompanion = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  // First check if the user is the owner of the companion
  const { data: companion, error: fetchError } = await supabase
    .from("companions")
    .select("author")
    .eq("id", companionId)
    .single();

  if (fetchError) return { error: "Companion not found." };

  if (companion.author !== userId) {
    return { error: "Unauthorized access." };
  }

  // Delete session history related to this companion (optional)
  await supabase
    .from("session_history")
    .delete()
    .eq("companion_id", companionId);

  // Delete the companion
  const { error: deleteError } = await supabase
    .from("companions")
    .delete()
    .eq("id", companionId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  return { success: true };
};