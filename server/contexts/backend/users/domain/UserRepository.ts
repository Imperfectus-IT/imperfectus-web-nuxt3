export interface UserRepository {
  login(identifier: string, password: string): Promise<User>
  signup(): Promise<User>
}
