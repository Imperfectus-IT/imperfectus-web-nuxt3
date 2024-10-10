import type { DomainUser } from '~/composables/shared/user/types/DomainUser.ts'

export const useUpdateUser = () => {
  const { subscribeToNewsletter, unsubscribeFromNewsletter, getUser } = useDomainUserRepository()
  const { domainUser } = useDomainUserState()
  const executeSubscribeToNewsletter = async (user: DomainUser) => {
    await subscribeToNewsletter(user)
    domainUser.value = await getUser()
  }
  const executeUnsubscribeFromNewsletter = async (user: DomainUser) => {
    await unsubscribeFromNewsletter(user)
    domainUser.value = await getUser()
  }

  return {
    executeSubscribeToNewsletter,
    executeUnsubscribeFromNewsletter,
  }
}
