export const useProductsFactory = (product: any) => {
  const itemProductFactory = () => {
  return {
    id: product.id,
    name: product.name_es,
    type: product.type,
    itemType: product.itemType
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
      amount: product.price
    }
  }

  return {
    itemProductFactory,
    boxProductFactory
  }
}