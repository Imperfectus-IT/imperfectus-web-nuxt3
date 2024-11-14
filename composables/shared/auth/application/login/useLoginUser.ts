import type { StrapiAuthenticationResponse } from '@nuxtjs/strapi'
import type { UserLogin } from '~/composables/shared/auth/infrastructure/types/UserPayload.ts'

export const useLoginUser = () => {
  const executeLoginUser = async (userData: UserLogin): Promise<StrapiAuthenticationResponse> => {
    const { login } = useAuthStrapiRepository()
    return login(userData)
  }

  return { executeLoginUser }
}
