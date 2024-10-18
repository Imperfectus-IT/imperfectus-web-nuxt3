import { useUpdateUser } from '~/composables/shared/user/application/update/useUpdateUser.ts'
import type { DomainUser } from '~/composables/shared/user/types/DomainUser.ts'

export const useUpdateUserHandler = () => {
  const { executeSubscribeToNewsletter, executeUnsubscribeFromNewsletter } = useUpdateUser()
  const handleSubscribeToNewsletter = async (myUser: User) => {
    await executeSubscribeToNewsletter(myUser)
  }
  const handleUnsubscribeFromNewsletter = async (myUser: User) => {
    await executeUnsubscribeFromNewsletter(myUser)
  }
  return {
    handleSubscribeToNewsletter,
    handleUnsubscribeFromNewsletter,
  }
}
