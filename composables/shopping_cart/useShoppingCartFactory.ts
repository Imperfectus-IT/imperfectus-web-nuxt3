import type { ShoppingCart } from './types/ShoppingCartType.ts'
import {
  AVAILABILITY_STEP,
} from './types/ShoppingCartConstants.ts'

export const useShoppingCartFactory = () => {
  const emptyShoppingCart = (): ShoppingCart => {
    return {
      deliveryHour: '',
      preferredDay: '',
      preferredHour: '',
      step: AVAILABILITY_STEP,
      purchaseType: '',
      boxProductSelected: null,
      boxSize: '',
      boxType: '',
      status: 'pending',
      deliveryDate: '',
      coverage: null,
      items: [],
      billingAddress: {
        billingFirstName: '',
        billingLastName: '',
        billingEmail: '',
        billingPhone: '',
        billingAddress: '',
        billingAddress2: '',
        billingPostalCode: '',
        billingCity: '',
        billingState: '',
        billingNif: '',
        billingCountry: '',
      },
      shippingAddress: {
        shippingFirstName: '',
        shippingLastName: '',
        shippingEmail: '',
        shippingPhone: '',
        shippingAddress: '',
        shippingPostalCode: '',
        shippingCity: '',
        shippingState: '',
        shippingCountry: '',
      },
    }
  }

  return {
    emptyShoppingCart,
  }
}
