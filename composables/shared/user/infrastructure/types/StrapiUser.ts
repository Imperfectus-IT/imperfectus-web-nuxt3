export type StrapiUser = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: any
  role: { id: number, name: string }
  created_at: string
  updated_at: string
  user_id: number
  language: ProfileLanguage
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
  preferred_products: { vegetables: number[], fruits: number[] }
}
