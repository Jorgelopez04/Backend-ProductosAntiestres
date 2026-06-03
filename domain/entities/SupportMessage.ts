export interface SupportMessage {
  id: string
  name?: string | null
  email?: string | null
  message: string
  isRead: boolean
  createdAt: Date
}
