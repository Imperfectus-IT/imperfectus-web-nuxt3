import { generateId } from '~/composables/shared/utils/infrastructure/UuidGenerator.ts'

const { activeBoxProducts } = useProductsState()

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

export function createIMBoxItem(): ShoppingCartItem {
  return {
    uuid: generateId(),
    amount: 0,
    coupon: null,
    boxType: '',
    boxSize: 'IM',
    purchaseType: '',
    frequency: '',
    quantity: 1,
    exclusions: [],
    product: activeBoxProducts.value.find((product: BoxProduct) => product.sku === 'IM') || null,
  }
}

export function createSBoxItem(): ShoppingCartItem {
  return {
    uuid: generateId(),
    amount: 0,
    coupon: null,
    boxType: '',
    boxSize: 'S',
    purchaseType: '',
    frequency: '',
    quantity: 1,
    exclusions: [],
    product: null,
  }
}

export function createXLBoxItem(): ShoppingCartItem {
  return {
    uuid: generateId(),
    amount: 0,
    coupon: null,
    boxType: '',
    boxSize: 'XL',
    purchaseType: '',
    frequency: '',
    quantity: 1,
    exclusions: [],
    product: null,
  }
}
