import { generateId } from '@/composables/shared/infraestructura/UuidGenerator.ts'
import type { BillingAddress } from './BillingAddress.ts'
import type { ShippingAddress } from './ShippingAddress.ts'
import type { Item } from './Item.ts'
import { createEmpty as createEmptyBillingAddress } from './BillingAddress.ts'
import { createEmpty as createEmptyShippingAddress } from './ShippingAddress.ts'
import { createEmpty as createEmptyItem } from './Item.ts'

export type ShoppingCart = {
  id: string
  status: string
  step: string
  deliveryDate: string
  deliveryHour: string
  preferredDay: string
  preferredHour: string
  invoiceRequired: boolean
  coverage?: string | null | undefined
  termConditions: boolean
  whatsappInfo: boolean
  marketingInfo: boolean
  billingAddress: BillingAddress
  shippingAddress: ShippingAddress
  items: Item[]
  currentItem: Item | null
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
    id: generateId(),
    status: 'pending',
    step: AVAILABILITY_STEP,
    deliveryDate: '',
    deliveryHour: '',
    preferredDay: '',
    preferredHour: '',
    invoiceRequired: false,
    coverage: null,
    termConditions: false,
    whatsappInfo: false,
    marketingInfo: false,
    billingAddress: createEmptyBillingAddress(),
    shippingAddress: createEmptyShippingAddress(),
    items: [],
    currentItem: createEmptyItem(),
  }
}

export function isCoverageValid (coverage: string | null | undefined): boolean {
  return coverage !== null && coverage !== undefined
}
