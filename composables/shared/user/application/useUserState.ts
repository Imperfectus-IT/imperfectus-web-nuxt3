import type { Ref } from 'vue'
import { emptyUser } from '~/composables/shared/user/infrastructure/useUserFactory.ts'

export const useUserState = () => {
  const user: Ref<User> = useState('user', () => emptyUser())
  return {
    user,
  }
}
