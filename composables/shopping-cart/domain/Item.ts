import { generateId } from '~/composables/shared/utils/infrastructure/UuidGenerator.ts'
import type { SelectedBox } from '~/components/boxes/types/BoxSelected.ts'

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

export function createPreselectedBoxItem(boxSize: string, newBox: SelectedBox, purchaseType: string, product: BoxProduct): ShoppingCartItem {
  return {
    uuid: generateId(),
    amount: 0,
    coupon: null,
    boxType: newBox.content,
    boxSize,
    purchaseType,
    frequency: newBox.frequency,
    quantity: newBox.units,
    exclusions: [],
    product,
  }
}
