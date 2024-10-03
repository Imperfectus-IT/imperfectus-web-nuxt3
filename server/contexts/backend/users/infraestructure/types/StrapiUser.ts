export interface StrapiUser {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean | null
  role: number
  created_at: string
  updated_at: string
  user_id: number
  language: string
  ref: string
  type: string
  company: string | null
  odoo_partner_id: string | null
  odoo_partner_shipping_id: string | null
  odoo_id: string | null
  odoo_partner_invoice_id: string | null
  whatsappInfoComm: boolean
  marketingInfoComm: boolean
  device_tokens: string | null
  first_connection_date_app: string
  last_connection_date_app: string
  Preferred_products: string | null
  completed: number
}
