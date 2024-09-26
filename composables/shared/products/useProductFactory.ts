export default function () {
  const createBoxProduct = (product: any): BoxProduct => {
    return {
      id: product?.id,
      name_es: product.name_es,
      name_ca: product.name_ca,
      description_es: product.description_es,
      description_ca: product.description_ca,
      image: product.image,
      isActive: product.isActive,
      type: product.type,
      price: product.price,
      weight: product.weight,
      boxType: product.boxType,
      isImperfectusProduct: product.isImperfectusProduct,
    }
  }
  const createItemProduct = (product: any): ItemProduct => {
    return {
      id: product?.id,
      name_es: product.name_es,
      name_ca: product.name_ca,
      image: product.imagePath?.[0],
      isActive: product.isActive,
      type: product.type,
      itemType: product.itemType,
      isImperfectusProduct: product.isImperfectusProduct,
    }
  }

  return {
    createBoxProduct,
    createItemProduct,
  }
}
