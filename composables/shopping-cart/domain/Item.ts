import { generateId } from '@/composables/shared/infraestructura/UuidGenerator.ts'
import type { Product } from './Product.ts'

export type Item = {
  id: string
  amount: number
  coupon?: Coupon | null
  boxType: string
  boxSize: string
  purchaseType: string
  frequency?: string
  quantity: number
  exclusions: Product[]
  product?: Product | null
}

export function createEmpty(): Item {
  return {
    id: generateId(),
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
