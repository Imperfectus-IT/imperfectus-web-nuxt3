import type { ProfileLanguage } from '~/composables/shared/user/profile/types/Profile.ts'

export type User = {
  id: number
  username: string
  email: string
  confirmed: boolean
  role: string
  language: ProfileLanguage
  userCoupon: string
  type: string
  company: number | null
  whatsappInfoComm: boolean
  marketingInfoComm: boolean
  preferredProducts: PreferredProducts
}

export type PreferredProducts = {
  vegetables: number[]
  fruits: number[]
}

export type ProfileLanguages = {
  name: string
  code: string
}

export interface PersonalData {
  username?: string
  email: string
}

export type Profile = {
  id: number
  company?: string
  email: string
  language: ProfileLanguage
  username: string
}

export const availableLanguages: ProfileLanguages[] = [
  {
    name: 'Català',
    code: 'ca',
  },
  {
    name: 'Castellano',
    code: 'es',
  },
  {
    name: 'Português',
    code: 'pt',
  },
]
