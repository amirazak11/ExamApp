"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { IRegisterFields } from "@/lib/types/auth";
import RegisterButton from "./login-button";
import { forgetpassword } from "@/features/auth/api/forgetpassword/forgetpassword.api";

type Props = {
  onNext: () => void;
  email: string;
  updateFormData: (data: Partial<IRegisterFields>) => void;
};

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export function ForgetPasswordStep({
  onNext,
  email,
  updateFormData,
}: Props) {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);

    const postsPayload = await forgetpassword({email :data.email ,
       redirectUrl: `${window.location.origin}/reset-password`
    });
    console.log(data);
    
      updateFormData({ email: data.email });
      toast.success(postsPayload.message);
      onNext();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <form
        id="forget-password-form"
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forget-password-email">
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id="forget-password-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <RegisterButton isPending={isPending} />
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}