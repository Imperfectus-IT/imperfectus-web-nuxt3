import type { StrapiAuthenticationResponse } from '@nuxtjs/strapi'
import type { RegisterUser } from '~/composables/auth/types/Auth.ts'

export const useRegisterUser = () => {
  const executeRegisterUser = async (userData: RegisterUser): Promise<StrapiAuthenticationResponse> => {
    const { register } = useAuthRepository()
    return await register(userData)
  }

  return { executeRegisterUser }
}
