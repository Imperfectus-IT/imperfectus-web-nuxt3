export const useGetFormWithoutCharge = () => {
  const { getRedsysFormWithoutCharge } = usePaymentRepository()
  const { url, body } = useFormPaymentState()
  const executeGetFormWithoutCharge = async () => {
    const paymentForm = await getRedsysFormWithoutCharge()
    url.value = paymentForm.url
    body.value = paymentForm.body
  }
  return {
    executeGetFormWithoutCharge,
  }
}
