import { useUserState } from '~/composables/shared/user/application/useUserState.ts'

export const useGetUserHandler = () => {
  const { executeGetUser } = useGetUser()
  const { domainUser } = useUserState()
  const handleGetDomainUser = async () => {
    await executeGetUser()
  }

  return {
    domainUser,
    handleGetDomainUser,
  }
}
