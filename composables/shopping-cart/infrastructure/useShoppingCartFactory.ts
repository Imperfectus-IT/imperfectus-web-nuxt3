import { v4 as uuidv4 } from 'uuid'
import {
  AVAILABILITY_STEP,
} from '../types/ShoppingCartConstants.ts'

export const useShoppingCartFactory = () => {
  const emptyItem = (): Item => {
    return {
      id: uuidv4(),
      amount: 0,
      exclusions: [],
      image: '',
      boxProduct: null,
      boxType: '',
      boxSize: '',
      purchaseType: '',
      frequency: 'once',
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
      coupon: null,
      termConditions: false,
      whatsappInfo: false,
      marketingInfo: false,
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
