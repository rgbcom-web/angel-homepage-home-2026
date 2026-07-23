"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { setPagingIndexes } from "@/features/board/ui";

export async function getList(tableName, searchParams, itemsPerPage) {
  try {
    const { page, category } = searchParams;
    const { startIndex, endIndex } = setPagingIndexes(page, itemsPerPage);

    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*", { count: "exact" }).range(startIndex, endIndex);

    if (category) {
      query.eq("category", category);
    }

    query.order("fixed", { ascending: false });
    query.order("published_at", { ascending: false });

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    // 데이터 가공
    data.map((row, i) => {
      row.no = count - startIndex - i;

      if (!row?.thumbnail?.filePath) return;

      row.thumbnail.url = supa.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET)
        .getPublicUrl(row.thumbnail.filePath).data.publicUrl;
    });

    return { data, count };
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
