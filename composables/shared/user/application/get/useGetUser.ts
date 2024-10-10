import { useUserState } from '~/composables/shared/user/application/useUserState.ts'
import { useUserRepository } from '~/composables/shared/user/infrastructure/useUserRepository.ts'

export const useGetUser = () => {
  const { getUser } = useUserRepository()
  const { domainUser } = useUserState()
  const executeGetUser = async () => {
    domainUser.value = await getUser()
  }
  return {
    executeGetUser,
  }
}
