import { generateId } from '~/composables/shared/utils/infrastructure/UuidGenerator.ts'

export type ShoppingCartItem = {
  uuid: string
  amount: number
  coupon?: Coupon | null
  boxType: string
  boxSize: string
  purchaseType: string
  frequency?: string
  quantity: number
  exclusions: number[]
  product: BoxProduct | null
}

export function createEmpty(): ShoppingCartItem {
  return {
    uuid: generateId(),
    amount: 0,
    coupon: null,
    boxType: '',
    boxSize: '',
    purchaseType: '',
    frequency: '',
    quantity: 1,
    exclusions: [],
    product: null,
  }
}
