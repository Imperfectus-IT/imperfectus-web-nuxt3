import type { UserRepository } from '~/server/contexts/backend/users/domain/UserRepository'

export class LoginUser implements UserRepository {
  constructor(private readonly repository: UserRepository) {}

  execute(identifier: string, password: string): Promise<User> {
    return this.repository.login(identifier, password)
  }
}
