import type { StrapiAuthenticationResponse } from '@nuxtjs/strapi'
import type { RegisterUser, UserLogin } from '~/composables/shared/auth/infrastructure/types/UserPayload.ts'

export const useAuthStrapiRepository = () => {
  const login = async (userData: UserLogin): Promise<StrapiAuthenticationResponse> => {
    const { login } = useStrapiAuth()
    return login(userData)
  }

  const register = async (userData: RegisterUser): Promise<StrapiAuthenticationResponse> => {
    const { register } = useStrapiAuth()
    return register(userData)
  }

  const logout = (): void => {
    const { logout } = useStrapiAuth()
    logout()
  }

  return {
    login,
    register,
    logout,
  }
}
