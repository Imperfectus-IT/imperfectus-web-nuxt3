export const useProfileLanguageRepository = () => {
  const getAll = (): ProfileLanguages[] => {
    return [
      {
        name: 'Català',
        code: 'ca',
      },
      {
        name: 'Castellano',
        code: 'es',
      },
    ]
  }
  const update = async (id: number, language: ProfileLanguage): Promise<Profile> => {
    const { update } = useStrapi()
    return await update<Profile>('profile', id, { language })
  }

  return {
    getAll,
    update,
  }
}
