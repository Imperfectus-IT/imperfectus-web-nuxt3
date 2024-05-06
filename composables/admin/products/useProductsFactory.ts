export const useProductsFactory = (product: any) => {
  const itemProductFactory = () => {
    return {
      id: product.id,
      name: product.name_es,
      type: product.type, // item | box
      itemType: product.itemType, // vegetable | fruit
      image: product.itemType === 'fruit' ? `/images/landing/products/frutas/${product.name_es}.webp` : `/images/landing/products/verduras/${product.name_es}.webp`,
      isActive: product.isActive,
    }
  }

  const boxProductFactory = () => {
    return {
      id: product.id,
      name: product.name_es,
      type: product.type,
      itemType: product.itemType,
      boxType: product.boxType,
      sku: product.SKU,
      amount: product.price,
    }
  }

  return {
    itemProductFactory,
    boxProductFactory,
  }
}
