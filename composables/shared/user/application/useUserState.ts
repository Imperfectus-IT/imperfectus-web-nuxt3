import type { Ref } from 'vue'
import type { DomainUser } from '~/composables/shared/user/types/DomainUser.ts'
import { emptyUser } from '~/composables/shared/user/infrastructure/useUserFactory.ts'

export const useUserState = () => {
  const domainUser: Ref<DomainUser> = useState('domainUser', () => emptyUser())
  return {
    domainUser,
  }
}
