export const useProductsState = () => {
  const products: Ref<Products> = useState('products', () => ({
    itemProducts: {
      fruits: [],
      vegetables: []
    },
    boxProducts: []
  }));
  return {
    products
  };
}