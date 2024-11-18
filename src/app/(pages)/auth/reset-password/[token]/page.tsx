import { ResetPasswordForm } from "@/components";
import { validatePasswordResetToken } from "../../action";

export default async function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const isValidToken = await validatePasswordResetToken(params.token);

  return isValidToken ? (
    <ResetPasswordForm token={params.token} />
  ) : (
    <div>Invalid or expired reset link</div>
  );
}
