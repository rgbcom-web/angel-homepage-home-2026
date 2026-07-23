"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { cookies } from "next/headers";
import moment from "moment";

export async function getPopupList({ tableName }) {
  try {
    const today = moment().format("YYYY-MM-DD");

    const supa = await createAdminClient();

    const query = supa
      .from(tableName)
      .select("*")
      .eq("disabled", false)
      .or(
        `always_display.eq.true,and(always_display.eq.false,start_date.lte.${today},end_date.gte.${today})`,
      )
      .order("z_index", { ascending: false })
      .order("id", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error("팝업 데이터 페칭 오류");
    }

    const filteredData = data.filter((row) => {
      const popupId = `popup_${row.id}`;
      const hidedPopup = cookies().get(popupId);
      return !hidedPopup;
    });

    return {
      data: filteredData,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}
