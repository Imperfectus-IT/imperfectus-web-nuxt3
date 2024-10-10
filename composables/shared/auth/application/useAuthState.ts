import type { User } from '~/composables/shared/auth/domain/User.ts'
import type { RegisterUser, UserLogin } from '~/composables/shared/auth/infrastructure/types/UserPayload.ts'

export const useAuthState = () => {
  const user: Ref<User | null> = useState('user', () => null)
  const userLogin: Ref<UserLogin> = useState('userLogin', () => {
    return {
      identifier: '',
      password: '',
    }
  })
  const registerUser: Ref<RegisterUser> = useState('registerUser', () => {
    return {
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      talkualLegalBasis: '',
      marketingInfoComm: '',
      language: 'es',
    }
  })

  return {
    user,
    userLogin,
    registerUser,
  }
}
