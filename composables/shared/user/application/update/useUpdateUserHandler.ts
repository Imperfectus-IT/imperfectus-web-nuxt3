import { useUpdateUser } from '~/composables/shared/user/application/update/useUpdateUser.ts'
import type { DomainUser } from '~/composables/shared/user/types/DomainUser.ts'

export const useUpdateUserHandler = () => {
  const { executeSubscribeToNewsletter, executeUnsubscribeFromNewsletter } = useUpdateUser()
  const handleSubscribeToNewsletter = async (user: DomainUser) => {
    await executeSubscribeToNewsletter(user)
  }
  const handleUnsubscribeFromNewsletter = async (user: DomainUser) => {
    await executeUnsubscribeFromNewsletter(user)
  }
  return {
    handleSubscribeToNewsletter,
    handleUnsubscribeFromNewsletter,
  }
}
