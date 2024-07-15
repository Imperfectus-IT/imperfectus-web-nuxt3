export const useProductsFactory = (product: any) => {
  const itemProductFactory = () => {
    return {
      id: product.id,
      name_es: product.name_es,
      name_ca: product.name_ca,
      type: product.type, // item | box
      itemType: product.itemType, // vegetable | fruit
      image: product.imagePath,
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
      weight: product.weight,
    }
  }

  return {
    itemProductFactory,
    boxProductFactory,
  }
}
