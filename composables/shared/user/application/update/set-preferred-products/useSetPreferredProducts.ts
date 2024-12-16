export const useSetPreferredProducts = () => {
  const { updatePreferredProducts, getUser } = useUserRepository()
  const { user } = useUserState()
  const executeSetPreferredProducts = async (id: number, preferredProducts: PreferredProducts): Promise<void> => {
    await updatePreferredProducts(id, preferredProducts)
    user.value = await getUser()
  }

  return { executeSetPreferredProducts }
}
