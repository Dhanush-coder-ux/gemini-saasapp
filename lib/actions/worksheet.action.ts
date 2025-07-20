'use server'

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { error } from "console";



export const createWorkSheet = async (formData: CreateWorkSheet) => {
  const supabase = createSupabaseClient();
  const { userId: author } = await auth();

  const { data, error } = await supabase
    .from("work_sheet")
    .insert([{ ...formData, author }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error.message);
    return { error: error.message };
  }

  if (!data || data.length === 0) {
    return { error: "No data returned from insert." };
  }

  return  data[0];
};

export const getUserWorkSheet = async (userId: string ) => {

  const supabase = createSupabaseClient();

  const query = supabase
  .from("work_sheet")
  .select('*')
  .eq('author',userId)
  

  const { data, error } = await query;
   if(error) return(error.message);

   return data;

}

export const deleteUserWorkSheet = async ( id: string ) => {
  const {userId} = await auth();
  const supabase = createSupabaseClient();

    const { data: companion, error: fetchError } = await supabase
    .from("work_sheet")
    .select("author")
    .eq("id", id)
    .single();

  if (fetchError) return { error: "worksheet not found." };

  if (companion.author !== userId) {
    return { error: "Unauthorized access." };
  }


  const { error:deleteError } = await 
  supabase
  .from('work_sheet')
  .delete()
  .eq('id',id)

  if(deleteError) return(deleteError.message);

  return {success : true}

}


export const getSingleWorkSheet = async( id :string ) => {
  const supabase =createSupabaseClient();

  const { data , error } = await supabase.from('work_sheet').select().eq('id',id);
   if(error) return console.log(error);

   return data[0];
   
}