export default function () {
  const { shoppingCart } = useShoppingCartState()
  const { executeFindCoverageByPostalCode } = useGetCoverageByPostalCode()

  const isInvalid = computed(() => !isPostalCodeLengthValid(shoppingCart.value.shippingAddress.shippingPostCode) || !isCoverageValid(shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage))
  const findCoverageByPostalCode = async (postalCode: string | null) => {
    if (!isPostalCodeLengthValid(postalCode)) {
      return
    }
    const query: LocationQuery = {
      postcode: postalCode as string,
      deliveryDate: shoppingCart.value.deliveryDate,
    }
    shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage = await executeFindCoverageByPostalCode(query) as string
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
