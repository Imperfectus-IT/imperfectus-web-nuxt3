import type { PersonalData } from "./types/PersonalData.ts";

const user = useStrapiUser();

export const usePersonalDataFactory = () => {
    const personalData: PersonalData = {
        id: Number(user.value.id),
        username: user.value?.username,
        email: user.value.email,
    };

    return { personalData };
};
