import { useDomainUserFactory } from '~/composables/admin/domain-user/useDomainUserFactory.ts'
import type { DomainUser } from '~/composables/admin/domain-user/types/DomainUser.ts'

export const useDomainUserRepository = () => {
  const client = useStrapiClient()
  const { update, find } = useStrapi()
  const getUser = async (): Promise<DomainUser> => {
    const user = useStrapiUser()
    const id = user.value?.id
    const strapiUser = await find('users', { id })
    return useDomainUserFactory(strapiUser[0])
  }
  const subscribeToNewsletter = async (user: DomainUser) => {
    return await client('/hubspot/marketing-communications', {
      method: 'POST',
      body: {
        email: user.email,
        marketingInfoComm: 'yes',
        talkualLegalBasis: 'freelyGivenConsentFromContact',
        language: user.language,
      },
    })
  }
  const unsubscribeFromNewsletter = async (user: DomainUser) => {
    await update('users', user.id, { marketingInfoComm: false })
  }
  return {
    getUser,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
  }
}
