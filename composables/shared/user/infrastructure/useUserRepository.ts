import { useUserFactory } from '~/composables/shared/user/infrastructure/useUserFactory.ts'

export const useUserRepository = () => {
  const client = useStrapiClient()
  const { find, update } = useStrapi()

  const getUser = async (): Promise<User> => {
    const user = useStrapiUser()
    const id = user.value?.id
    const strapiUser: StrapiUser = await find('users', { id })
    return useUserFactory(strapiUser[0])
  }
  const subscribeToNewsletter = async (user: User) => {
    return await client(`/profile/${user.id}/communications/email`, {
      method: 'POST',
      body: user,
    })
  }
  const unsubscribeFromNewsletter = async (user: User) => {
    return await client(`/profile/${user.id}/communications/email`, {
      method: 'POST',
      body: user,
    })
  }

  const updateLanguage = async (id: number, language: ProfileLanguage): Promise<Profile> => {
    const { update } = useStrapi()
    return await update<Profile>('profile', id, { language })
  }

  const updatePersonalData = async (id: number, personalData: PersonalData) => {
    return await update<Profile>('profile', id, personalData)
  }

  const updatePassword = async (oldPassword: string, password: string, newPassword: string, email: string) => {
    await client('/profile/changePassword', {
      method: 'POST',
      body: {
        email: email,
        password: oldPassword,
        newPassword: password,
        confirmPassword: newPassword,
      },
    })
  }

  const updatePreferredProducts = async (userId: number, preferredProducts: PreferredProducts) => {
    await client(`/profile/${userId}/update-preferred-products`, {
      method: 'PUT',
      body: preferredProducts,
    })
  }

  return {
    getUser,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    updatePassword,
    updateLanguage,
    updatePersonalData,
    updatePreferredProducts,
  }
}
