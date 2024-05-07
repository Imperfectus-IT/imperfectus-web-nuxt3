import type { StrapiAuthenticationResponse } from '@nuxtjs/strapi'
import type { UserLogin } from '~/composables/auth/types/Auth.ts'

export const useAuthRepository = () => {
  const login = async (userData: UserLogin): Promise<StrapiAuthenticationResponse> => {
    const { login } = useStrapiAuth()
    return await login(userData)
  }

  return {
    login,
  }
}
