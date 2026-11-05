export interface IAuditLog {
  id: string
  createdAt: string
  actorUserId: string | null
  actorUsername: string
  actorEmail: string
  actorRole: "USER" | "ADMIN" | "SUPER_ADMIN"
  category: "DIPLOMA" | "EXAM" | "QUESTION" | "USER" | "SYSTEM"
  action: "CREATE" | "UPDATE" | "DELETE" | "SET_IMMUTABLE" | "SEED_DATA"
  entityType: string
  entityId: string | null
  metadata: Record<string, unknown> | null
  ipAddress: string | null
  userAgent: string | null
  httpMethod: string | null
  path: string | null
}
