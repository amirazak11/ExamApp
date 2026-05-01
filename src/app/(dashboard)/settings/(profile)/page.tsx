"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import RegisterButton from "@/app/(auth)/_components/login-button"
import { useSession } from "next-auth/react"
import useUpdateProfile from "@/app/(auth)/login/_hooks/use-update"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  phone: z.string().min(1, "Phone is required"),
    email: z.string().min(1, "email is required"),
})

type FormValues = z.infer<typeof formSchema>
export default function RegisterPage() {
    const {data:session} =useSession();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: session?.user.firstName ?? "",
      lastName: session?.user.lastName ?? "",
      username: session?.user.username ?? "",
      email:session?.user.email ?? "",
      phone: session?.user.phone ?? "",
    },
  })          
const { updateProfile, isPending } = useUpdateProfile();
  const onSubmit = (data: FormValues) => {
    updateProfile(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full p-2 bg-white">
      <FieldGroup>
        <div className="flex gap-3">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>First name</FieldLabel>
                <Input {...field} placeholder="Ahmed" className="h-11 w-full rounded-none border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-0" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>Last name</FieldLabel>
                <Input {...field} placeholder="Abdullah" className="h-11 w-full rounded-none border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-0" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Username</FieldLabel>
              <Input {...field} placeholder="user123" className="h-11 w-full rounded-none border border-slate-300 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-0" disabled />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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

<RegisterButton variant="next" />

    </form>
    
  )
}