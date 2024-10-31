export const useGetShippingCompaniesHandler = (postcode: string, deliveryDate: string) => {
  const { executeGetShippingCompanies } = useGetShippingCompanies()
  onMounted(async () => {
    return await executeGetShippingCompanies(postcode, deliveryDate)
  })
}
