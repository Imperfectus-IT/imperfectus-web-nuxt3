export const useGetLocaleLanguage = (locale: string) => {
  const getLocaleName = computed(() => locale.value === 'es' ? 'Es' : 'Ca')
  return {
    getLocaleName,
  }
}
