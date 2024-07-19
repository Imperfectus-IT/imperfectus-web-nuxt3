import { useUserState } from '~/composables/admin/user/useUserState.ts'
import { useUserRepository } from '~/composables/admin/user/useUserRepository.ts'

export const useGetUser = () => {
  const { getUser } = useUserRepository()
  const { user } = useUserState()
  const executeGetUser = async () => {
    user.value = await getUser()
  }

  return {
    executeGetUser,
  }
}
