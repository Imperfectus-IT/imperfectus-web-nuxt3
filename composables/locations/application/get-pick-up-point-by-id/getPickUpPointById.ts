export const useGetPickUpPointById = () => {
  const { getPickUpPointById } = useStrapiLocationRepository()
  const executeGetPickUpPointById = async (id: string, postcode: string, coverage: string) => {
    return await getPickUpPointById(id, postcode, coverage)
  }

  return {
    executeGetPickUpPointById,
  }
}
