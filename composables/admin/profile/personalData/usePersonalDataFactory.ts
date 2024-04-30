import type { PersonalDataType } from "./PersonalDataType.ts";


export const usePersonalDataFactory = () => {
    const user = useStrapiUser();

    const personalData: PersonalDataType = {
        id: Number(user.value.id),
        username: user.value?.username,
        email: user.value.email,
    };

    return { personalData };
};
