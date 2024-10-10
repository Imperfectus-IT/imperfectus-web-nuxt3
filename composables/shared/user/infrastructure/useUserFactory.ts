import type { StrapiUser } from '@/composables/shared/user/infrastructure/types/StrapiUser.ts'

export const useUserFactory = (user: StrapiUser): User => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    confirmed: user.confirmed,
    role: user.role.name,
    type: user.type,
    company: user.company,
    userCoupon: user.ref,
    language: user.language,
    whatsappInfoComm: user.whatsappInfoComm,
    marketingInfoComm: user.marketingInfoComm,
  }
}

export const emptyUser = (): User => {
  return {
    id: 0,
    username: '',
    email: '',
    confirmed: false,
    role: '',
    userCoupon: '',
    type: '',
    company: null,
    whatsappInfoComm: false,
    marketingInfoComm: false,
    language: '',
  }
}
