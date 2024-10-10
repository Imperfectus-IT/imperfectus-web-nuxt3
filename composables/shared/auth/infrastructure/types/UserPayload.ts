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
