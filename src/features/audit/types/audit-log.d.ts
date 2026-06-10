export interface IAuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  userId: string
  userName: string
  description: string
  createdAt: string
  status: "success" | "warning" | "error"
}
