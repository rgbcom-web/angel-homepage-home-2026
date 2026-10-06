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

  const to = mailRecipient.email;
  const sendmailResult = await sendmail(to, mailSubject, mailBody, attachments);

  return sendmailResult;
}
