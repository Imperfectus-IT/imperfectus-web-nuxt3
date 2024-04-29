import type { PersonalDataType } from "./PersonalDataType.ts";

const user = useStrapiUser();

export const usePersonalDataFactory = () => {
    const personalData: PersonalDataType = {
        id: Number(user.value.id),
        username: user.value?.username,
        email: user.value.email,
    };

    return { personalData };
};
