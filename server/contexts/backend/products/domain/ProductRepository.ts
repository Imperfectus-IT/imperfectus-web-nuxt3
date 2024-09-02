import type { Product } from '~/server/contexts/backend/products/domain/Product'

export interface ProductRepository {
  getAll(): Promise<Product[]>
}
