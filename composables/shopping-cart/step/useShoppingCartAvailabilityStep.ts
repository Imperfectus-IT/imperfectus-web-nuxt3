import { isCoverageValid } from '~/composables/shopping-cart/domain/ShoppingCart.ts'
import { isPostalCodeLengthValid, MAX_POSTAL_CODE_LENGTH } from '~/composables/shopping-cart/domain/ShippingAddress.ts'

export default function () {
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
    isPostalCodeLengthValid,
    MAX_POSTAL_CODE_LENGTH,
  }
}
