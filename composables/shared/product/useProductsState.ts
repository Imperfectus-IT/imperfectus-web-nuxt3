export const useProductsState = () => {
  const products: Ref<Product[]> = useState('products', () => [])
  return {
    products,
  }
}
