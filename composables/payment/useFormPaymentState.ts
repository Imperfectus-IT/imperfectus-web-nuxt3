export const useFormPaymentState = () => {
  const url = useState('url', () => null)
  const body = useState('body', () => ({
    Ds_SignatureVersion: null,
    Ds_MerchantParameters: null,
    Ds_Signature: null,
  }))
  return {
    url,
    body,
  }
}
