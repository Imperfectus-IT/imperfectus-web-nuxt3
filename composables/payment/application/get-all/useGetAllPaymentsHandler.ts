export const useGetAllPaymentsHandler = () => {
  const { payments, executeGetPaymentsFromUser } = useGetAllPayments()
  const user = useStrapiUser()

  onMounted(async () => {
    await executeGetPaymentsFromUser(user?.value?.id)
  })

  return {
    payments,
  }
}
