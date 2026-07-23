"use server";

import { createAdminClient } from "@/service/db/supabase/server";

export async function getList(tableName, categoryTableName, categoryId) {
  try {
    const supa = await createAdminClient();

    const categoryQuery = supa
      .from(categoryTableName)
      .select("title")
      .eq("id", categoryId)
      .single();

    const query = supa
      .from(tableName)
      .select("*, category:category_id(title)")
      .eq("category_id", categoryId)
      .neq("disabled", true)
      .order("order", { ascending: false });

    const { data: category, error: categoryError } = await categoryQuery;

    if (categoryError) {
      throw categoryError;
    }

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

    return { data, category };
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
