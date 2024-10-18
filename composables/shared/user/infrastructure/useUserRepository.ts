import { useUserFactory } from '~/composables/shared/user/infrastructure/useUserFactory.ts'
import type { DomainUser } from '~/composables/shared/user/types/DomainUser.ts'

export const useUserRepository = () => {
  const client = useStrapiClient()
  const { update, find } = useStrapi()
  const getUser = async (): Promise<DomainUser> => {
    const user = useStrapiUser()
    const id = user.value?.id
    const strapiUser = await find('users', { id })
    return useUserFactory(strapiUser[0])
  }
  const subscribeToNewsletter = async (user: User) => {
    return await client(`/profile/${user.id}/communications/email`, {
      method: 'POST',
      body: user,
    })
  }
  const unsubscribeFromNewsletter = async (user: DomainUser) => {
    return await client(`/profile/${user.id}/communications/email`, {
      method: 'POST',
      body: user,
    })
  }
  return {
    getUser,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
  }
}
