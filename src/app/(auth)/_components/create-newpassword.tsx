"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import RegisterButton from "./login-button";
import { InputGroup } from "@/components/ui/input-group";
import PasswordField from "@/components/shared/pasword-field";
import { useState } from "react";
import { resetpassword } from "@/features/auth/api/forgetpassword/forgetpassword.api";
import ErrorAlert from "@/components/shared/error-alert";

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

export default function CreateNewPasswordStep() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!token) {
  toast.error("Reset token is missing");
  return;
}
    try {
      setIsPending(true);

     const postsPayload = await resetpassword({
      token,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    });

      toast.success(postsPayload.message);
      router.push("/login");
    } catch (error) {
          setErrorMessage(error.message || "Something went wrong");
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsPending(false);
    }
  }
  

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password</FieldLabel>

              <InputGroup>
                <PasswordField
                  {...field}
                  id="password"
                  autoComplete="new-password"
                />
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Confirm Password</FieldLabel>

              <InputGroup>
                <PasswordField
                  {...field}
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
        {errorMessage && (
  <ErrorAlert message={errorMessage} />
)}
      <RegisterButton isPending={isPending} />
    </form>
  );
}