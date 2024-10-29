export default function () {
  const { shoppingCart } = useShoppingCartState()
  const { executeFindCoverageByPostalCode } = useGetCoverageByPostalCode()

  const isInvalid = computed(() => !isPostalCodeLengthValid(shoppingCart.value.shippingAddress.shippingPostCode) || !isCoverageValid(shoppingCart.value.coverage))
  const findCoverageByPostalCode = async (postalCode: string | null) => {
    if (!isPostalCodeLengthValid(postalCode)) {
      return
    }
    const query: LocationQuery = {
      postcode: Number(postalCode),
      deliveryDate: shoppingCart.value.deliveryDate,
    }
    shoppingCart.value.coverage = await executeFindCoverageByPostalCode(query)
  }

  const goBack = () => {
    const router = useRouter()
    const localePath = useLocalePath()
    router.push(localePath({ name: 'index' }))
  }

  return {
    shoppingCart,
    isInvalid,
    findCoverageByPostalCode,
    goBack,
    isPostalCodeLengthValid,
    MAX_POSTAL_CODE_LENGTH,
  }
}
