import type { User } from '~/composables/auth/types/User.ts'

export interface Payment {
  id: number
  user: User
  paymentMethod: string
  cardNumber: string
  cardCountry: string
  cardBrand: string
  currency: string
  expiryMonth: number
  expiryYear: number
  created_at: string
  updated_at: string
  notification_hash: any
}
