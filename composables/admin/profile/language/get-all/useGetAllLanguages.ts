export const useGetAllLanguages = () => {
  const executeGetAllLanguages = (): ProfileLanguages[] => {
    const { getAll } = useProfileLanguageRepository()
    return getAll()
  }

  return {
    executeGetAllLanguages,
  }
}
