import type { ProfileLanguages } from '~/composables/admin/profile/types/Profile.ts'

export const useGetAllLanguages = () => {
  const executeGetAllLanguages = (): ProfileLanguages[] => {
    const { getAll } = useProfileLanguageRepository()
    return getAll()
  }

  return {
    executeGetAllLanguages,
  }
}
