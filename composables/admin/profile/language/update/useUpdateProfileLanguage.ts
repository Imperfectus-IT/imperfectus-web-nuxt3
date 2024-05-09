export const useUpdateProfileLanguage = () => {
    const { update } = useProfileLanguageRepository()
    const executeUpdateProfileLanguage = async (id: number, language: ProfileLanguage): Promise<void> => {
        await update(id, language)
    }

    return { executeUpdateProfileLanguage }
}
