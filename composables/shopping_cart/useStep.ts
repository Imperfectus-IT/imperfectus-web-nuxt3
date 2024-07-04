export const useStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const route = useRoute()
  const router = useRouter()

  const executeStep = async (step: string) => {
    shoppingCart.value.step = step
    await router.push({
      path: route.path,
      query: { step },
    })
  }

  return {
    executeStep,
  }
}
