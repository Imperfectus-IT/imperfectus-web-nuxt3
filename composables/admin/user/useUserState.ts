import type { Ref } from 'vue'
import type { User } from '~/composables/admin/user/types/UserType.ts'
import { emptyUser } from '~/composables/admin/user/useUserFactory.ts'

export const useUserState = () => {
  const user: Ref<User> = useState('user', () => emptyUser())
  return {
    user,
  }
}
