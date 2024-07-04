import type {Product, ProductQuery} from "~/composables/shared/product/types/Product.ts";
export const useStrapiProductRepository = () => {
    const findProducts = async (query: ProductQuery): Promise<Partial<Product[]>> => {
        const { find } = useStrapi()
        return await find<Product[]>('products', query)
    }

    return {
        findProducts,
    }
}
