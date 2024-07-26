import { useDomainUserFactory } from '~/composables/admin/domain-user/useDomainUserFactory.ts'
import type { DomainUser } from '~/composables/admin/domain-user/types/DomainUser.ts'
import type PreferredProducts from '~/components/admin/my-account/PreferredProducts.vue'

export const useDomainUserRepository = () => {
  const client = useStrapiClient()
  const { find, update } = useStrapi()
  const getUser = async (): Promise<DomainUser> => {
    const user = useStrapiUser()
    const id = user.value?.id
    const strapiUser = await find('users', { id })
    return useDomainUserFactory(strapiUser[0])
  }
  const subscribeToNewsletter = async (email: string, language: string) => {
    return await client('/hubspot/marketing-communications', {
      method: 'POST',
      body: {
        email,
        marketingInfoComm: 'yes',
        talkualLegalBasis: 'freelyGivenConsentFromContact',
        language,
      },
    })
  }
  const unsubscribeFromNewsletter = async (email: string, language: string) => {
    // NOT IMPLEMENTED ON API
  }
  const setPreferredProducts = async (userId: number, preferredProducts: PreferredProducts) => {
    await update('users', userId, { preferredProducts })
  }
  const updatePersonalData = async (id: number, personalData: PersonalData): Promise<DomainUser> => {
    const strapiUser = await update('users', id, personalData)
    return useDomainUserFactory(strapiUser)
  }
  const updateUserLanguage = async (id: number, language: string): Promise<DomainUser> => {
    const strapiUser = await update('users', id, { language })
    return useDomainUserFactory(strapiUser)
  }
  return {
    getUser,
    setPreferredProducts,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    updatePersonalData,
    updateUserLanguage,
  }
}
