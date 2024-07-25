export const useShoppingCartAvailabilityStep = () => {
  const {
    isPostalCodeLengthValid,
    isCoverageValid,
  } = useLocationValidator()

  const { shoppingCart } = useShoppingCartState()
  const { executeFindCoverageByPostalCode } = useFindCoverageByPostalCode()

  const isInvalid = computed(() => !isPostalCodeLengthValid(shoppingCart.value.shippingAddress.postalCode) || !isCoverageValid(shoppingCart.value.coverage))
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
  }
}
