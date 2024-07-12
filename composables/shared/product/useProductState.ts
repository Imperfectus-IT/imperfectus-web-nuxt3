import type { Product } from '~/composables/shared/product/types/Product.ts'

export const useProductState = () => {
  const products: Ref<Product[] | []> = useState('products', () => [])

  return {
    products,
  }
}
