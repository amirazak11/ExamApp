"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { IRegisterFields } from "@/lib/types/auth"
import RegisterButton from "./login-button"
import { InputGroup } from "@/components/ui/input-group"
import PasswordField from "@/components/shared/pasword-field"
import useRegister from "../login/_hooks/use-register"

type Props = {
  onNext?: () => void
  formData: Partial<IRegisterFields>
  updateFormData: (data: Partial<IRegisterFields>) => void
}

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

type FormValues = z.infer<typeof formSchema>

export default function CreatePasswordStep({
  formData,
  updateFormData,
}: Props) {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: formData.password ?? "",
      confirmPassword: formData.confirmPassword ?? "",
    },
  })
  const { isPending, register } = useRegister()
  function onSubmit(data: FormValues) {
    const finalData: IRegisterFields = {
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      username: formData.username ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
      password: data.password,
      confirmPassword: data.confirmPassword,
    }

    updateFormData(data)

    register(finalData, {
      onSuccess: (response) => {
        if (response.status) {
          toast.success("Account created successfully")
          router.push("/login")
        }
      },
      onError: () => {
        toast.error("Something went wrong")
      },
    })
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

      <RegisterButton variant="next" isPending={isPending} />
    </form>
  )
}