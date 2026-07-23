import { ResetPasswordForm } from "@/features/pediatric-auth/reset-password-form";
import { validateResetTokenAction } from "@/features/pediatric-auth/password-reset-actions";

export const metadata = {
  title: "비밀번호 재설정",
};

export default async function PediatricResetPasswordPage({ searchParams }) {
  const params = await searchParams;
  const token = String(params?.token || "").trim();
  const { valid } = token ? await validateResetTokenAction(token) : { valid: false };

  return <ResetPasswordForm token={token} tokenValid={valid} />;
}
