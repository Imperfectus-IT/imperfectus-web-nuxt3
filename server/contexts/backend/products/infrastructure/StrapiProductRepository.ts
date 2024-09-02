import { Product } from '~/server/contexts/backend/products/domain/Product'
import type { ProductRepository } from '~/server/contexts/backend/products/domain/ProductRepository'

export class StrapiProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const config = useRuntimeConfig()
    const products = await $fetch(`${config.STRAPI_URL}/products`)
    return Promise.all(products.map(product => this.createProduct(product)))
  }

  private createProduct(product) {
    return new Product(
      product.id,
      product.SKU,
      product.price,
      product.isActive,
      product.weight,
      product.name_es,
      product.name_ca,
      product.description_es,
      product.description_ca,
      product.imagePath,
      product.type,
      product.boxType,
      product.itemType,
      product.frequency,
    )
  }
}
