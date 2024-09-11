import type { UserRepository } from '~/server/contexts/backend/users/domain/UserRepository'
import { User } from '~/server/contexts/backend/users/domain/User'

export class StrapiUserRepository implements UserRepository {
  async login(identifier, password) {
    const strapiUser = await $fetch(`${config.STRAPI_URL}/auth/local`, {
      method: 'POST',
      body: {
        identifier,
        password,
      },
    })
    return this.createUser(strapiUser)
  }

  async signup(email: string, password: string, talkualLegalBasis: boolean) {
    const strapiUser = await $fetch(`${config.STRAPI_URL}/auth/local/register`, {
      method: 'POST',
      body: {
        email,
        password,
        talkualLegalBasis,
      },
    })
    return this.createUser(strapiUser)
  }

  createUser(strapiUser: any) {
    return new User(
      strapiUser.user.id,
      strapiUser.user.username,
      strapiUser.user.email,
      strapiUser.user.confirmed,
      strapiUser.user.blocked,
      strapiUser.user.type,
      strapiUser.user.marketingInfoComm,
      strapiUser.user.whatsappInfoComm,
      strapiUser.user.role.name,
      strapiUser.jwt,
    )
  }
}
