export type User = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: any
  role: number
  created_at: string
  updated_at: string
  user_id: number
  language: string
  ref: string
  type: string
  company: any
  odoo_partner_id: string
  odoo_partner_shipping_id: any
  odoo_partner_invoice_id: any
  whatsappInfoComm: any
  marketingInfoComm: boolean
  device_tokens: string[]
  first_connection_date_app: string
  last_connection_date_app: string
}

export type UserLogin = {
  identifier: string
  password: string
}

export type RegisterUser = {
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
  talkualLegalBasis?: string
  marketingInfoComm?: string
  language: string
}
