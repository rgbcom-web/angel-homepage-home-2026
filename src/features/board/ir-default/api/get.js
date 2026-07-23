"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { setPagingIndexes } from "@/features/board/ui";

const ORDER_KEY = "id";

export async function getList(tableName, searchParams, itemsPerPage) {
  try {
    const { page, search } = searchParams;
    const { startIndex, endIndex } = setPagingIndexes(page, itemsPerPage);

    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*", { count: "exact" }).range(startIndex, endIndex);

    if (search) {
      query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    query.order(ORDER_KEY, { ascending: false });

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    // 데이터 가공
    data.map((item, i) => {
      item.no = count - startIndex - i;
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

export async function getItemById(tableName, id, searchParams) {
  try {
    const { search } = searchParams || {};

    const supa = await createAdminClient();

    const { data: currentData, error: fetchError } = await supa
      .from(tableName)
      .select("views")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const currentViews = currentData.views;

    const updateViewsPromise = supa
      .from(tableName)
      .update({ views: currentViews + 1 })
      .eq("id", id)
      .select()
      .single();

    const prevDataPromise = supa
      .from(tableName)
      .select("id, title")
      .lt("id", id)
      .order(ORDER_KEY, { ascending: false })
      .limit(1)
      .single();

    if (search) {
      prevDataPromise.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const nextDataPromise = supa
      .from(tableName)
      .select("id, title")
      .gt("id", id)
      .order(ORDER_KEY, { ascending: true })
      .limit(1)
      .single();

    if (search) {
      nextDataPromise.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const [
      { data, error },
      { data: prevData, error: prevError },
      { data: nextData, error: nextError },
    ] = await Promise.all([updateViewsPromise, prevDataPromise, nextDataPromise]);

    if (error) {
      throw error;
    }

    return { data, prevData, nextData };
  } catch (error) {
    return {
      errors: {
        message: "서버 오류가 발생했습니다.",
      },
    };
  }
}
