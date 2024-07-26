import { useDomainUserState } from '~/composables/admin/domain-user/useDomainUserState.ts'
import { useDomainUserRepository } from '~/composables/admin/domain-user/useDomainUserRepository.ts'

export const useGetUser = () => {
  const { getUser } = useDomainUserRepository()
  const { domainUser } = useDomainUserState()
  const executeGetUser = async () => {
    const strapiUser = await getUser()
    domainUser.value = useDomainUserFactory(strapiUser)
  }
  return {
    executeGetUser,
  }
}
