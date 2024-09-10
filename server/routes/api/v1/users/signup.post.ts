import type { H3Event } from 'h3'
import { SignupUser } from '~/server/contexts/backend/users/application/signup/SignupUser'
import { StrapiUserRepository } from '~/server/contexts/backend/users/infraestructure/StrapiUserRepository'

export default defineEventHandler(async (event: H3Event) => {
  const { email, password, talkualLegalBasis } = await readBody(event)
  const userRepository = new StrapiUserRepository()
  const signupUser = new SignupUser(userRepository)
  return await signupUser.execute(email, password, talkualLegalBasis)
})
