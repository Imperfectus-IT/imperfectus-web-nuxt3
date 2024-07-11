import { v4 as uuidv4 } from 'uuid'
import type { ShoppingCart } from './types/ShoppingCartType.ts'
import {
  AVAILABILITY_STEP,
} from './types/ShoppingCartConstants.ts'

export const useShoppingCartFactory = () => {
  const emptyItem = (): Item => {
    return {
      id: uuidv4(),
      amount: 0,
      exclusions: [],
      image: '',
      product: null,
      purchaseType: '',
      frequency: '',
      quantity: 1,
    }
  }

  const emptyBillingAddress = (): BillingAddress => {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      state: '',
      cif: '',
      company: '',
      country: '',
    }
  }
  const emptyShippingAddress = (): ShippingAddress => {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      state: '',
      company: '',
      country: '',
      notes: '',
    }
  }
  const emptyShoppingCart = (): ShoppingCart => {
    return {
      deliveryHour: '',
      preferredDay: '',
      preferredHour: '',
      invoiceRequired: false,
      step: AVAILABILITY_STEP,
      status: 'pending',
      deliveryDate: '',
      coverage: null,
      items: [],
      currentItem: null,
      billingAddress: emptyBillingAddress(),
      shippingAddress: emptyShippingAddress(),
    }
  }

  return {
    emptyShoppingCart,
    emptyItem,
    emptyBillingAddress,
    emptyShippingAddress,
  }
}
