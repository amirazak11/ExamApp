"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useEmail from "../login/_hooks/use-email"
import { IRegisterFields } from "@/lib/types/auth"
import RegisterButton from "./login-button"

type Props = {
  onNext: () => void
  email: string
  updateFormData: (data: Partial<IRegisterFields>) => void
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export function CreateAccountStep({
  onNext,
  email,
  updateFormData,
}: Props) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  })
  const { createEmail , isPending } = useEmail();

  function onSubmit(data: z.infer<typeof formSchema>) {
    createEmail(
      { email: data.email },
      {
        onSuccess: (response) => {
          if (response.status) {
            updateFormData({ email: data.email })
            toast.success("Email submitted successfully")
            onNext()
          }
        },
      }
    )
  }

  return (
    <>
      <form id="form-rhf-demo" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>

                <Input
                  {...field}
                  id="form-rhf-demo-email"
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

<RegisterButton isPending={isPending} variant="next" />

      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </>
  )
}