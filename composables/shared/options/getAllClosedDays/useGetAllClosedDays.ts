export const useGetAllClosedDays = () => {
  const executeGetAllClosedDays = async (): Promise<string[]> => {
    const { getClosedDays } = useStrapiOptionRepository()
    return await getClosedDays()
  }
  return {
    executeGetAllClosedDays,
  }
}
