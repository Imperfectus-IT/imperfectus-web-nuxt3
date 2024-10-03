import type { ProductRepository } from '~/server/contexts/backend/products/domain/ProductRepository'
import { BoxProduct } from '~/server/contexts/backend/products/domain/BoxProduct'
import { ItemProduct } from '~/server/contexts/backend/products/domain/ItemProduct'

export class StrapiProductRepository implements ProductRepository {
  async getAll(): Promise<{ boxProducts: BoxProduct[], itemProducts: ItemProduct[] }> {
    const config = useRuntimeConfig()
    const products = await $fetch(`${config.STRAPI_URL}/products?isActive=all`)
    const itemProducts = await Promise.all(products.filter(product => product.type === 'item').map(product => this.createItemProduct(product)))
    const boxProducts = await Promise.all(products.filter(product => product.type === 'box').map(product => this.createBoxProduct(product)))

    return {
      boxProducts,
      itemProducts,
    }
  }

  private createBoxProduct(product) {
    return new BoxProduct(
      {
        id: product.id,
        sku: product.SKU,
        price: product.price,
        isActive: product.isActive,
        weight: product.weight,
        nameEs: product.name_es,
        nameCa: product.name_ca,
        descriptionEs: product.description_es,
        descriptionCa: product.description_ca,
        image: product.imagePath,
        type: product.type,
        boxType: product.boxType,
        frequency: product.frequency,
        isImperfectusProduct: product.isImperfectusProduct,
      },
    )
  }

  private createItemProduct(product) {
    return new ItemProduct(
      {
        id: product.id,
        nameCa: product.name_ca,
        nameEs: product.name_es,
        isImperfectusProduct: product.isImperfectusProduct,
        image: product.imagePath,
        type: product.type,
        isActive: product.isActive,
        itemType: product.itemType,
      },
    )
  }
}
