import type { Product, ProductExclusion } from '~/composables/shared/product/types/Product.ts'

export const useProductFactory = () => {
  const makeProductExclusion = (product: Product, locale: string): ProductExclusion => {
    return {
      id: product.id,
      sku: product.SKU,
      name: product[`name_${locale}`],
    }
  }

  const makeProductForDropdown = (product: Product, locale: string): ProductDropdown => {
    return {
      id: product.id,
      name: product[`name_${locale}`],
    }
  }

  const makeProductForCarousel = (product: Product, locale: string): CarouselProduct => {
    return {
      ...makeProductExclusion(product, locale),
      image: product.imagePath,
    }
  }

  const makeProductBox = (product: Product, locale: string): ProductBox => {
    return {
      ...makeProductExclusion(product, locale),
      price: product.price,
      description: product[`description_${locale}`],
      image: `/images/boxes/Caja-${product.SKU}-empty.webp`,
    }
  }

  return {
    makeProductExclusion,
    makeProductBox,
    makeProductForCarousel,
    makeProductForDropdown,
  }
}
