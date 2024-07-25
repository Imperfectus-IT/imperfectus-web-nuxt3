import type { Ref } from 'vue'
import type { DomainUser } from '~/composables/admin/domain-user/types/DomainUser.ts'
import { emptyUser } from '~/composables/admin/domain-user/useDomainUserFactory.ts'

export const useDomainUserState = () => {
  const domainUser: Ref<DomainUser> = useState('domainUser', () => emptyUser())
  return {
    domainUser,
  }
}
