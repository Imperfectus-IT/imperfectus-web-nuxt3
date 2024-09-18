import type { UserLogin } from '~/composables/auth/types/Auth.ts'

export const useLoginUser = () => {
  const executeLoginUser = async (userData: UserLogin): Promise<void> => {
    const { login } = useAuthStrapiRepository()
    await login(userData)
  }

  return { executeLoginUser }
}
