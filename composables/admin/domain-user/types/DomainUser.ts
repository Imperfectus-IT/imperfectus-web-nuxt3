export type DomainUser = {
  id: number
  username: string
  email: string
  confirmed: boolean
  role: string
  language: string
  userCoupon: string
  type: string
  company: number | null
  whatsappInfoComm: boolean
  marketingInfoComm: boolean
  preferredProducts: PreferredProducts
}

export type PreferredProducts = {
  fruits: number[]
  vegetables: number[]
}
