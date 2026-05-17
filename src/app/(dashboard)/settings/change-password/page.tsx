"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { InputGroup } from "@/components/ui/input-group";
import PasswordField from "@/components/shared/pasword-field";
import RegisterButton from "@/app/(auth)/_components/login-button";
import useChangePassword from "@/app/(auth)/login/_hooks/use-changepassword";

const formSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ChangePassword() {
  const { Changepassword, isPending } = useChangePassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
   };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
      <FieldGroup>
                <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Current Password</FieldLabel>

              <InputGroup>
                <PasswordField
                  {...field}
                  id="password"
                  autoComplete="Current Password"
                />
              </InputGroup>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
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

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
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

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <RegisterButton variant="submit" isPending={isPending} />
    </form>
  );
}