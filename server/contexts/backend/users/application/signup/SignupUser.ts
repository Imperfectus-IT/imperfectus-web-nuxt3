import type { UserRepository } from '~/server/contexts/backend/users/domain/UserRepository'

export class SignupUser implements UserRepository {
  constructor(private readonly repository: UserRepository) {}

  execute(email, password, talkualLegalBasis): Promise<User> {
    return this.repository.signup(email, password, talkualLegalBasis)
  }
}
