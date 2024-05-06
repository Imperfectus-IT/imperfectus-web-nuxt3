import type { User, UserLogin } from '~/composables/auth/types/Auth.ts'

export const useAuthState = () => {
    const user: Ref<User|null> = useState('user', () => null)
    const userLogin: Ref<UserLogin> = useState('userLogin', () => {
        return {
            identifier: '',
            password: ''
        }
    })

    return {
        user,
        userLogin
    }
}
