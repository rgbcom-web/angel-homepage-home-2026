"use server";

import { createAdminClient } from "@/service/db/supabase/server";

export async function getList(tableName) {
  try {
    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*").limit(10);

    query.order("fixed", { ascending: false });
    query.order("published_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    data.forEach((row) => {
      if (!row?.thumbnail?.filePath) return;

      row.thumbnail.url = supa.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(row.thumbnail.filePath).data.publicUrl;
    });

    return { data };
  } catch (error) {
    console.error(error.message);
    return {
      data: [],
      count: 0,
      errors: {
        message: "서버 오류가 발생했습니다.",
      },
    };
  }
}

export async function getItemById(tableName, id) {
  try {
    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*").eq("id", id).single();

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    console.error(error.message);
    return {
      errors: {
        message: "서버 오류가 발생했습니다.",
      },
    };
  }
}
