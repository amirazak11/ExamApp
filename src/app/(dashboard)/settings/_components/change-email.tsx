
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IRegisterFields } from "@/lib/types/auth"
import RegisterButton from "@/app/(auth)/_components/login-button"

type EmailFormValues = {
  email: string
}

type Props = {
  email: string
  onSubmitEmail: (email: string) => void
  updateFormData?: (data: Partial<IRegisterFields>) => void
  isPending?: boolean
  showLoginLink?: boolean
  buttonVariant?: "next" | "submit"
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export function CreateAccountStep({
  email,
  onSubmitEmail,
  updateFormData,
  isPending,
  showLoginLink = false,
  buttonVariant = "next",
}: Props) {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  })

  function onSubmit(data: EmailFormValues) {
    updateFormData?.({ email: data.email })
    onSubmitEmail(data.email)
  }

  return (
    <>
      <form
        id="email-form"
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-11 w-full rounded-none border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-0"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <RegisterButton
          isPending={isPending}
          variant={buttonVariant}
          type="submit"
        />
      </form>

      {showLoginLink && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      )}
    </>
  )
}