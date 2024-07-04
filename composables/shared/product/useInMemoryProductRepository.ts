import type {Product} from "~/composables/shared/product/types/Product.ts";
import {
    BOX_PRODUCT_TYPE,
    FRUIT_ITEM_PRODUCT_TYPE, FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE,
    ITEM_PRODUCT_TYPE, VEGETABLE_ITEM_PRODUCT_TYPE
} from "~/composables/shared/product/types/ProductConstants.ts";

export const useInMemoryProductRepository = () => {
    const { products } = useProductState()

    const activeBoxProducts = (): Array<Product> => products.value?.filter((product: Product) => product.type === BOX_PRODUCT_TYPE && product.isActive) || []

    const activeItemProducts = (): Array<Product> => products.value?.filter((product: Product) => product.type === ITEM_PRODUCT_TYPE && product.isActive) || []
    const activeFruitsItemProducts = (): Array<Product> => activeItemProducts().filter((product: Product) => product.itemType === FRUIT_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE) || []
    const activeVegetablesItemProducts = (): Array<Product> => activeItemProducts().filter((product: Product) => product.itemType === VEGETABLE_ITEM_PRODUCT_TYPE || product.itemType === FRUIT_VEGETABLE_ITEM_PRODUCT_TYPE) || []

    return {
        activeBoxProducts,
        activeItemProducts,
        activeFruitsItemProducts,
        activeVegetablesItemProducts
    }
}
