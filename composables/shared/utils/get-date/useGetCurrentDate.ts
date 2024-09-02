export const useGetCurrentDate = () => {
  const executeGetCurrentDate = async (): Promise<string> => {
    const { getDate } = useStrapiUtilRepository()
    return await getDate()
  }

  return {
    executeGetCurrentDate,
  }
}
