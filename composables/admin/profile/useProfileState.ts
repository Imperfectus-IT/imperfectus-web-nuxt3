export const useProfileState = () => {
  const selectedLanguage: Ref<string> = useState('selectedLanguage', () => 'es')

  return {
    selectedLanguage,
  }
}
