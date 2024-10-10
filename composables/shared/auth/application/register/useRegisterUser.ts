import type { StrapiAuthenticationResponse } from '@nuxtjs/strapi'
import type { RegisterUser } from '~/composables/shared/auth/domain/Auth.ts'

export const useRegisterUser = () => {
  const executeRegisterUser = async (userData: RegisterUser): Promise<StrapiAuthenticationResponse> => {
    const { register } = useAuthStrapiRepository()
    return await register(userData)
  }

  return { executeRegisterUser }
}
