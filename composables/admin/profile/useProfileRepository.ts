import type { ProfileLanguage, Profile } from "./types/Profile.ts";
export const useProfileRepository = () => {
    const updateLanguage = async (id: number, language: ProfileLanguage): Promise<Profile> => {
        const { update } = useStrapi()
        return await update<Profile>('profile', id,{ language })
    }
}
