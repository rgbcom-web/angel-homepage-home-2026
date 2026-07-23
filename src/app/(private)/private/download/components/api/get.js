"use server";

import { createAdminClient } from "@/service/db/supabase/server";

export async function getList(tableName) {
  try {
    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*").neq("disabled", true);

    query.order("order", { ascending: false });

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
      errors: {
        message: "서버 오류가 발생했습니다.",
      },
    };
  }
}
