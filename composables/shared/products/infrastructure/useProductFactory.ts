export default function () {
  const createBoxProduct = (product: StrapiProduct): BoxProduct => {
    return {
      id: product?.id,
      nameEs: product.name_es,
      nameCa: product.name_ca,
      descriptionEs: product.description_es,
      descriptionCa: product.description_ca,
      image: product.imagePath,
      isActive: product.isActive,
      type: product.type,
      price: product.price,
      weight: product.weight,
      boxType: product.boxType,
      isImperfectusProduct: product.isImperfectusProduct,
      sku: product.SKU,
    }
  }
  const createItemProduct = (product: StrapiProduct): ItemProduct => {
    return {
      id: product?.id,
      nameEs: product.name_es,
      nameCa: product.name_ca,
      image: product.imagePath,
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
