"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import RegisterButton from "@/app/(auth)/_components/login-button"
import { useSession } from "next-auth/react"

import useUpdateProfile from "@/app/(auth)/login/_hooks/use-update"
import { EmailModel } from "../_components/email-model"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function RegisterPage() {
  const { data: session } = useSession()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: ""
    },
  })
useEffect(() => {
  if (session?.user) {
    form.reset({
      firstName: session.user.firstName ?? "",
      lastName: session.user.lastName ?? "",
      phone: session.user.phone ?? "",
    });
  }
}, [session, form]);

  const { updateProfile, isPending } = useUpdateProfile()
const normalizeEgyptPhone = (phone: string) => {
  return phone
    .replace(/\s/g, "")
    .replace(/^\+20/, "0");
};
  const onSubmit = (data: FormValues) => {
      updateProfile({
  firstName: data.firstName,
  lastName: data.lastName,
  phone: normalizeEgyptPhone(data.phone),
});

  }

  return (
    <form
       onSubmit={form.handleSubmit(
    onSubmit,
    (errors) => {
      console.log("FORM ERRORS:", errors);
    }
  )}
      className="space-y-6 w-full p-2 bg-white"
    >
      <FieldGroup>

        <div className="flex gap-3">

          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>First name</FieldLabel>

                <Input
                  {...field}
                  placeholder="Ahmed"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>Last name</FieldLabel>

                <Input
                  {...field}
                  placeholder="Abdullah"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

        </div>

        <Field>
          <FieldLabel>Username</FieldLabel>

          <Input
            value={session?.user.username ?? ""}
            disabled
          />
        </Field>

        <Field>
          <div className="flex justify-between">
            <FieldLabel>Email</FieldLabel>
<EmailModel email={session?.user.email ?? ""} />
          </div>

          <Input
            value={session?.user.email ?? ""}
            disabled
          />
        </Field>

<Controller
  name="phone"
  control={form.control}
  render={({ field, fieldState }) => (
<Field data-invalid={fieldState.invalid}>
  <FieldLabel>Phone</FieldLabel>

  <PhoneInput
  className="w-full h-11 rounded-none border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-400  focus:outline-none"
    defaultCountry="eg"
    value={field.value ?? ""}
    onChange={(value) => field.onChange(value)}
    inputClassName="w-full h-11 rounded-none border-none px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:!border-blue-500 focus:!ring-0 focus:outline-none"
  />

  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
</Field>
  )}
/>

      </FieldGroup>

      <RegisterButton
        variant="next"
        type="submit"
        disabled={isPending}
      />
    </form>
  )
}
