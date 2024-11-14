export default function () {
  const createBoxProduct = (product: StrapiProduct): BoxProduct => {
    console.log(product)
    return {
      id: product?.id,
      nameEs: product.name_es,
      nameCa: product.name_ca,
      descriptionEs: product.description_es,
      descriptionCa: product.description_ca,
      image: product?.imagePath?.[0] ?? '',
      allImages: product?.imagePath?.length ? product?.imagePath : [],
      isActive: product.isActive,
      type: product.type,
      price: product.price,
      priceWithTax: parseFloat((product.price * (1 + product.tax_id.amount_value)).toFixed(2)),
      weight: product.weight,
      boxType: product.boxType,
      isImperfectusProduct: product.isImperfectusProduct,
      sku: product.SKU,
      tax: product.tax_id.amount,
    }
  }
  const createItemProduct = (product: StrapiProduct): ItemProduct => {
    return {
      id: product?.id,
      nameEs: product.name_es,
      nameCa: product.name_ca,
      image: product?.imagePath?.[0] ?? '',
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
