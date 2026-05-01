"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import RegisterButton from "./login-button"
import useLogin from "../login/_hooks/use-login"
import { InputGroup } from "@/components/ui/input-group"
import PasswordField from "@/components/shared/pasword-field"
import Link from "next/link"
import { loginSchema } from "@/features/auth/schema/login-schema"
type FormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username:  "",
      password:  "",
    },
  })          
  const {  login } = useLogin();

  const onSubmit = (data: FormValues) => {
       login(data);
  }

  return (
    <>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <FieldLabel>Username</FieldLabel>
                <Input {...field} placeholder="Ahmed"
                  />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              <Link
                href="#"
                className="text-sm font-medium text-blue-600 justify-end flex"
              >
                Forgot password?
              </Link>{" "}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />



      </FieldGroup>

<RegisterButton
 variant="submit" />

    </form>

    </>
  );
}
