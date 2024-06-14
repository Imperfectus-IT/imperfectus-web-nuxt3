import {
    S_PRODUCT_TYPE,
    IM_PRODUCT_TYPE,
    XL_PRODUCT_TYPE,
    SMALL_BOX_SIZE, MEDIUM_BOX_SIZE, XLARGE_BOX_SIZE
} from "~/composables/shared/product/types/ProductConstants"

export const useShoppingCartBoxStep = () => {
    const ORDER_TYPE = 'order'
    const {executeGetAllProducts} = useGetAllStrapiProducts()
    const {activeBoxProducts} = useInMemoryProductRepository()
    const {shoppingCart} = useShoppingCartState()
    const { locale } = useI18n()

    const orderBoxProductBySize = {
        [SMALL_BOX_SIZE]: activeBoxProducts.value.find(product => product.SKU === S_PRODUCT_TYPE),
        [MEDIUM_BOX_SIZE]: activeBoxProducts.value.find(product => product.SKU === IM_PRODUCT_TYPE),
        [XLARGE_BOX_SIZE]: activeBoxProducts.value.find(product => product.SKU === XL_PRODUCT_TYPE)
    }

    const setBoxProductSelected = () => {
        if (shoppingCart.value.purchaseType === ORDER_TYPE) {
            shoppingCart.value.boxProductSelected = orderBoxProductBySize[shoppingCart.value.boxSize]
        }
    }

    const boxProductToRender = computed(() => {
        return shoppingCart.value.boxProductSelected ? {
            id: shoppingCart.value.boxProductSelected.id,
            sku: shoppingCart.value.boxProductSelected.SKU,
            price: shoppingCart.value.boxProductSelected.price,
            name: shoppingCart.value.boxProductSelected[`name_${locale.value}`],
            description: shoppingCart.value.boxProductSelected[`description_${locale.value}`],
            image: shoppingCart.value.boxProductSelected.image.length > 0 ? shoppingCart.value.boxProductSelected.image[0].url : '',
        } : null
    })

    onMounted(async () => {
        await executeGetAllProducts()
    })

    return {
        setBoxProductSelected,
        boxProductToRender
    }
}
