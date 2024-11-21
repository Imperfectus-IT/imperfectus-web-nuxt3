export const useGetLocaleLanguage = (locale: string) => {
  const getLocaleName = computed(() => locale === 'es' ? 'Es' : 'Ca')
  return {
    getLocaleName,
  }
}
