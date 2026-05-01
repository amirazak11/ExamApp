'use client';
import { InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PasswordFieldProps = React.ComponentProps<typeof InputGroupInput>;

export default function PhoneField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <>
      <InputGroupInput className="w-full h-full" type={showPassword ? "text" : "password"} {...props} />
      <InputGroupAddon align="inline-end" onClick={() => setShowPassword(!showPassword)}>{showPassword ? (
            <EyeOff />
          ) : (
            <Eye />
          )}</InputGroupAddon>
      </>
  )
} 
