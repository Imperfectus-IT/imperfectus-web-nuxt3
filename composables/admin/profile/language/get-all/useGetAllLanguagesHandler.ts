import type { ComputedRef } from "vue";

export const useGetAllLanguagesHandler = (): any => {
    const { executeGetAllLanguages } = useGetAllLanguages()

    const languages = computed(() => {
        return executeGetAllLanguages()
    })

    return {
        languages
    }
}
