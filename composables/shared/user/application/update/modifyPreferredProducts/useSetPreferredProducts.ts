export const useSetPreferredProducts = () => {
  const { setPreferredProducts } = useDomainUserRepository()
  const executeSetPreferredProducts = async (userId: number, preferredProducts: PreferredProducts) => {
    await setPreferredProducts(userId, preferredProducts)
  }
  return {
    executeSetPreferredProducts,
  }
}
