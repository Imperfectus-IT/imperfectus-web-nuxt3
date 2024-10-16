export const useGetShippingCompaniesHandler = (postcode: string, deliveryDate: string) => {
  const { executeGetShippingCompanies } = useGetShippingCompanies()
  onMounted(async () => {
    console.log('useGetShippingCompaniesHandler', postcode, deliveryDate)
    return await executeGetShippingCompanies(postcode, deliveryDate)
  })
}
