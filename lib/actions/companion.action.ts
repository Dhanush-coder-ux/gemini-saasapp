'use server'
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { Columns } from "lucide-react";
import Error from "next/error";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions") // ✅ table name should be a string
    .insert([{ ...formData, author }]) // ✅ insert expects an array of records
    .select();

  if (error) {
    return (error.message)
  }

  return data[0  ];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase
    .from('companions')
    .select();

  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error){
    return(error.message)
  }
  
  return companions;
};
