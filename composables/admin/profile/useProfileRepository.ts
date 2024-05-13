export const useProfileRepository = () => {
    const update = async (id: number, personalData: PersonalData): Promise<Profile> => {
        const { update } = useStrapi()
        return await update<Profile>('profile', id, personalData)
    }

    return {
        update
    }
}
