import type { UserLogin } from '~/composables/shared/auth/domain/Auth.ts'

export const useLoginUser = () => {
  const executeLoginUser = async (userData: UserLogin): Promise<void> => {
    const { login } = useAuthStrapiRepository()
    await login(userData)
  }

  return { executeLoginUser }
}
