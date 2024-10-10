import type { ProductRepository } from '~/server/contexts/backend/products/domain/ProductRepository'
import { Product } from '~/server/contexts/backend/products/domain/Product'

export class StrapiProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const config = useRuntimeConfig()
    const strapiProducts = await $fetch(`${config.STRAPI_URL}/products?isActive=all`)
    return await Promise.all(strapiProducts.map(product => this.createProduct(product)))
  }

  private createProduct(product) {
    return new Product(
      product.id,
      product.name_es,
      product.name_ca,
      product.isImperfectusProduct,
      product.imagePath,
      product.type,
      product.isActive,
      product.itemType,
      product.weight,
      product.SKU,
      product.description_es,
      product.description_ca,
      product.boxType,
      product.price,
      product.frequency,
    )
  }
}
