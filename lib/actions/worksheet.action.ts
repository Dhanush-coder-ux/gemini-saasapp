'use server'

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";



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

export const getSingleWorkSheet = async( id :string ) => {
  const supabase =createSupabaseClient();

  const { data , error } = await supabase.from('work_sheet').select().eq('id',id);
   if(error) return console.log(error);

   return data[0];
   
}