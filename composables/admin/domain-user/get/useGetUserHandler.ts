import { useDomainUserState } from '~/composables/admin/domain-user/useDomainUserState.ts'

export const useGetUserHandler = () => {
  const { executeGetUser } = useGetUser()
  const { domainUser } = useDomainUserState()
  const handleGetDomainUser = async () => {
    await executeGetUser()
  }

  return {
    domainUser,
    handleGetDomainUser,
  }
}
