import type { StrapiAuthenticationResponse } from '@nuxtjs/strapi'
import type { RegisterUser, UserLogin } from '~/composables/auth/types/Auth.ts'

export const useAuthRepository = () => {
  const login = async (userData: UserLogin): Promise<StrapiAuthenticationResponse> => {
    const { login } = useStrapiAuth()
    return await login(userData)
    // const user = await useFetch('/api/v1/users/login', {
    //   body: userData,
    //   method: 'POST',
    // })
    // if (user) {
    //   const localePath = useLocalePath()
    //   const router = useRouter()
    //   const { jwt } = user.data.value
    //   const jwtCookie = useCookie('jwt')
    //   jwtCookie.value = jwt
    //   await router.push(localePath('admin'))
    // }
  }

  const register = async (userData: RegisterUser): Promise<StrapiAuthenticationResponse> => {
    console.log(userData)
    const { register } = useStrapiAuth()
    return await register(userData)
    // const newUser = await useFetch('/api/v1/users/signup', {
    //   body: userData,
    //   method: 'POST',
    // })
    // console.log(newUser)
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
