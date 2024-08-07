export const useProductsState = () => {
  const products: Ref<Array<Product | undefined>> = useState('products', () => [])
  return {
    products,
  }
}
