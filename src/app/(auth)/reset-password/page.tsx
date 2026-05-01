import { Header } from "../_components/header";
import CreateNewPasswordStep from "../_components/create-newpassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <section className="flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md space-y-6">
        <Header
          title="Create a New Password"
          subtitle="Set your new password"
          description="Choose a strong password to secure your account."
        />

        <div className="space-y-4">
              <Suspense fallback={<div>Loading...</div>}>
          <CreateNewPasswordStep />
         </Suspense>
        </div>
      </div>
    </section>
  );
}