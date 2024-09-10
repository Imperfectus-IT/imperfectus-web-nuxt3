import type { H3Event } from 'h3'
import { StrapiUserRepository } from '~/server/contexts/backend/users/infraestructure/StrapiUserRepository'
import { LoginUser } from '~/server/contexts/backend/users/application/login/LoginUser'

export default defineEventHandler(async (event: H3Event) => {
  const { identifier, password } = await readBody(event)
  const userRepository = new StrapiUserRepository()
  const loginUser = new LoginUser(userRepository)
  return await loginUser.execute(identifier, password)
})
