"use server";

import { createAdminClient } from "@/service/db/supabase/server";

const ORDER_BY = ["order", { ascending: false }];

export async function getList(tableName, searchParams) {
  try {
    const { search, category } = searchParams || {};

    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*", { count: "exact" });

    if (search) {
      query.or(`question.ilike.%${search}%,answer.ilike.%${search}%`);
    }

    if (category) {
      query.eq("category_1", category);
    }

    query.order(...ORDER_BY);

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

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

export async function getCategories(tableName) {
  try {
    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*");

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const depth1 = data.filter((item) => item.parent === null);
    const depth2 = data.filter((item) => item.parent !== null);

    const categories = {
      depth1,
      depth2,
    };

    return { categoryData: categories };
  } catch (error) {
    console.error(error.message);
    return {
      errors: {
        message: "서버 오류가 발생했습니다.",
      },
    };
  }
}
