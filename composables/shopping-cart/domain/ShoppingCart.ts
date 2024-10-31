import type { ShoppingCartItem } from './Item.ts'
import { createEmpty as createEmptyBillingAddress } from './BillingAddress.ts'
import { createEmpty as createEmptyShippingAddress } from './ShippingAddress.ts'
import { createEmpty as createEmptyItem, createIMBoxItem } from './Item.ts'
import { createEmpty as createEmptyAmount } from './Amount.ts'
import { generateId } from '~/composables/shared/utils/infrastructure/UuidGenerator.ts'
import type { ShoppingCartAmount } from '~/composables/shopping-cart/domain/Amount.ts'

export type ShoppingCart = {
  uuid: string
  step: string
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string | null
  invoiceRequired: boolean
  termConditions: boolean
  whatsappInfo: boolean
  marketingInfo: boolean
  amount: ShoppingCartAmount
  billingAddress: OrderBilling
  shippingAddress: OrderShipping
  items: ShoppingCartItem[]
  currentItem: ShoppingCartItem | null
}
export const AVAILABILITY_STEP = 'StepAvailability'
export const PURCHASE_TYPE_STEP = 'StepPurchaseType'
export const FREQUENCY_SUBSCRIPTION_TYPE_STEP = 'StepFrequencySubscriptionType'
export const BOX_STEP = 'StepBox'
export const CUSTOMIZE_STEP = 'StepCustomize'
export const AUTH_STEP = 'StepAuth'
export const RESUME_ITEM_STEP = 'StepResumeItem'
export const SHIPPING_STEP = 'StepShipping'
export const DELIVERY_STEP = 'StepDelivery'
export const DELIVERY_DATE_STEP = 'StepDeliveryDate'
export const PAYMENT_STEP = 'StepPayment'

export function createEmpty(): ShoppingCart {
  return {
    uuid: generateId(),
    step: AVAILABILITY_STEP,
    deliveryDate: '',
    deliveryHour: '',
    preferredDay: '',
    preferredHour: 'full',
    invoiceRequired: false,
    amount: createEmptyAmount(),
    termConditions: false,
    whatsappInfo: false,
    marketingInfo: false,
    billingAddress: createEmptyBillingAddress(),
    shippingAddress: createEmptyShippingAddress(),
    items: [],
    currentItem: createEmptyItem(),
  }
}

export function createIMBoxSelected(): ShoppingCart {
  return {
    uuid: generateId(),
    step: AVAILABILITY_STEP,
    deliveryDate: '',
    deliveryHour: '',
    preferredDay: '',
    preferredHour: 'full',
    invoiceRequired: false,
    amount: createEmptyAmount(),
    termConditions: false,
    whatsappInfo: false,
    marketingInfo: false,
    billingAddress: createEmptyBillingAddress(),
    shippingAddress: createEmptyShippingAddress(),
    items: [],
    currentItem: createIMBoxItem(),
  }
}

export function createXLBoxSelected(): ShoppingCart {
  return {
    uuid: generateId(),
    step: AVAILABILITY_STEP,
    deliveryDate: '',
    deliveryHour: '',
    preferredDay: '',
    preferredHour: 'full',
    invoiceRequired: false,
    amount: createEmptyAmount(),
    termConditions: false,
    whatsappInfo: false,
    marketingInfo: false,
    billingAddress: createEmptyBillingAddress(),
    shippingAddress: createEmptyShippingAddress(),
    items: [],
    currentItem: createEmptyItem(),
  }
}

export function createSBoxSelected(): ShoppingCart {
  return {
    uuid: generateId(),
    step: AVAILABILITY_STEP,
    deliveryDate: '',
    deliveryHour: '',
    preferredDay: '',
    preferredHour: 'full',
    invoiceRequired: false,
    amount: createEmptyAmount(),
    termConditions: false,
    whatsappInfo: false,
    marketingInfo: false,
    billingAddress: createEmptyBillingAddress(),
    shippingAddress: createEmptyShippingAddress(),
    items: [],
    currentItem: createEmptyItem(),
  }
}

export function isCoverageValid(coverage: string | null | undefined): boolean {
  return coverage !== null && coverage !== undefined
}
