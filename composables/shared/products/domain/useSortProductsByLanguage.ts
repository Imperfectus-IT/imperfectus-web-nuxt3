export const useSortProductsByLanguage = (products: ItemProduct[]) => {
  const { locale } = useI18n()
  const language = locale.value === 'ca' ? 'Ca' : 'Es'
  return products.sort((productA: ItemProduct, productB: ItemProduct) => productA[`name${language}`].localeCompare(productB[`name${language}`]))
}
