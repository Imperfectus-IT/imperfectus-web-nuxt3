export const useStep = () => {
  const { shoppingCart } = useShoppingCartState()
  const { scrollToTop } = useScroll()
  const route = useRoute()
  const router = useRouter()

  const setStep = (step: string) => {
    shoppingCart.value.step = step
  }

  const executeStep = async (step: string) => {
    setStep(step)
    await router.push({
      path: route.path,
      query: { step },
    })
    scrollToTop()
  }

  return {
    executeStep,
  }
}
