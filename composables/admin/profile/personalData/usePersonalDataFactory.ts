import type { PersonalData } from './types/PersonalData.ts'

export const usePersonalDataFactory = () => {
  const user = useStrapiUser()

  const personalData: PersonalData = {
    id: Number(user.value.id),
    username: user.value?.username,
    email: user.value.email,
  }

  return { personalData }
}
