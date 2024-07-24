export const useProductFactory = () => {
  const makeProductExclusion = (product: Product, locale: string): ProductExclusion => {
    return {
      id: product?.id,
      sku: product.SKU,
      name: product[`name_${locale}`],
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
  }
}
