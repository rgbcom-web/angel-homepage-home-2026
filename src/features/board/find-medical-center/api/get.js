"use server";

import { createAdminClient } from "@/service/db/supabase/server";

const ORDER_BY = ["order", { ascending: false }];

export async function getList(tableName, searchParams) {
  try {
    const { search, product, sido, sigungu } = searchParams;

    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*", { count: "exact" });

    if (search) {
      query.or(`name.ilike.%${search}%,tel.ilike.%${search}%,address.ilike.%${search}%`);
    }

    if (product && product !== "all") {
      query.contains("products", [product]);
    }

    if (sido && sido !== "all") {
      query.eq("sido", sido);
    }

    if (sigungu && sigungu !== "all") {
      query.eq("sigungu", sigungu);
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

export async function getProducts(tableName) {
  try {
    const supa = await createAdminClient();

    const query = supa.from(tableName).select("*");

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { products: data };
  } catch (error) {
    console.error(error.message);
    return {
      errors: {
        message: "서버 오류가 발생했습니다.",
      },
    };
  }
}
