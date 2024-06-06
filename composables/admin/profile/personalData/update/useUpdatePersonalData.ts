export const useUpdatePersonalData = () => {
  const { update } = useProfileRepository()
  const executeUpdatePersonalData = async (id: number, personalData: PersonalData) => {
    await update(id, personalData)
  }

  return {
    executeUpdatePersonalData,
  }
}
