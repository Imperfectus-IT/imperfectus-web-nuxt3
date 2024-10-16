export const useGetShippingCompanies = () => {
  const { getShippingCompaniesByPostcodeAndDate } = useStrapiLocationRepository()
  const executeGetShippingCompanies = async (postcode: string, deliveryDate: string) => {
    return await getShippingCompaniesByPostcodeAndDate(postcode, deliveryDate)
  }

  return {
    executeGetShippingCompanies,
  }
}
