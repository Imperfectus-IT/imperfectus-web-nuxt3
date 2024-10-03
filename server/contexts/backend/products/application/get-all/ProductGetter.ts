import type { ProductRepository } from '~/server/contexts/backend/products/domain/ProductRepository'
import type { BoxProductType, ItemProductType } from '~/server/contexts/backend/products/domain/types/ProductTypes'

export class ProductGetter {
  constructor(private readonly repository: ProductRepository) {
  }

  execute(): Promise<{ boxProducts: BoxProductType [], itemProducts: ItemProductType[] }> {
    return this.repository.getAll()
  }
}
