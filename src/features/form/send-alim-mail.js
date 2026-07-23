"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { sendmail } from "@/service/api/mailer";

const RECIPIENT_TABLE_NAME = process.env.NEXT_PUBLIC_ALIM_MAIL_RECIPIENTS_TABLE_NAME;

export async function sendAlimMail({ tableName, mailSubject, mailBody, attachments }) {
  const supa = await createAdminClient();

  const { data: mailRecipient, error: mailRecipientError } = await supa
    .from(RECIPIENT_TABLE_NAME)
    .select("*")
    .eq("table_id", tableName)
    .single();

  if (mailRecipientError || !mailRecipient) {
    throw new Error(
      mailRecipientError?.message ||
        `알림메일 수신자가 없습니다. (table_id: ${tableName})`,
    );
  }

  const to = mailRecipient.email;
  if (!to || (Array.isArray(to) && to.length === 0)) {
    throw new Error(`알림메일 수신자 이메일이 비어 있습니다. (table_id: ${tableName})`);
  }

  const sendmailResult = await sendmail(to, mailSubject, mailBody, attachments);

  return sendmailResult;
}
