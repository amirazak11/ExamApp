"use client"

import { useSession } from "next-auth/react"
import { USER_ROLES } from "@/features/auth/constants/user.constant"

export function useIsSuperAdmin() {
  const { data: session } = useSession()

  return session?.user?.role === USER_ROLES.SUPER_ADMIN
}
