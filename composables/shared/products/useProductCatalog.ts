export const useProductCatalog = () => {
    const { activeBoxProducts } = useLocalStorageProductRepository()
    const { shoppingCart } = useShoppingCartState()

    const productCatalog = activeBoxProducts().filter(product => {
        if (shoppingCart.value.currentItem.boxType === STONE_FRUITS_BOX_TYPE) {
            return product.frequency === shoppingCart.value.currentItem.frequency && product.SKU.endsWith('Stone')
        }
        return product.frequency === shoppingCart.value.currentItem.frequency && product.boxType === shoppingCart.value.currentItem.boxType && !product.SKU.endsWith('Stone')
    })
    console.log(productCatalog)
    const findProductCatalogByStartWith = (productType: string) => productCatalog.find(product => product.SKU.startsWith(productType))

    const boxProductBySize = {
        [SMALL_BOX_SIZE]: computed(() => findProductCatalogByStartWith(S_PRODUCT_TYPE)),
        [MEDIUM_BOX_SIZE]: computed(() => findProductCatalogByStartWith(IM_PRODUCT_TYPE)),
        [XLARGE_BOX_SIZE]: computed(() => findProductCatalogByStartWith(XL_PRODUCT_TYPE)),
    }

    return {
        productCatalog,
        boxProductBySize,
        findProductCatalogByStartWith
    }
}
