import type { User } from '~/composables/admin/user/types/UserType.ts'
import { useStrapiUser } from '#build/imports'

export const useUserRepository = () => {
  const user = useStrapiUser()
  const { update } = useStrapi()
  const getUser = async (): Promise<User> => {
    return useUserFactory(user.value)
  }
  const subscribeUserOnMarketing = async (user: User) => {
    await update('user', user.id, { MarketingInfoComm: true })
  }
  return {
    getUser,
    subscribeUserOnMarketing,
  }
}
