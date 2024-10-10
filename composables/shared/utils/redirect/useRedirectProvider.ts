export const useRedirectProvider = () => {
  const localePath = useLocalePath()
  const router = useRouter()
  const { redirectPaths } = useRedirectPaths()
  const emit = defineEmits<{
    (e: 'nextStep'): void
  }>()

  const STEP_SHIPPING = 'StepShipping'

  const [redirectProvider, setRedirectProvider] = useState<string | null>(null)

  const redirectActions = {
    [redirectPaths.ADMIN]: () => router.push(redirectPaths.ADMIN),
    [redirectPaths.ORDER]: () => {
      emit('nextStep', STEP_SHIPPING)
      router.push(
        localePath({ name: 'order', query: { step: STEP_SHIPPING } }),
      )
    },
    [redirectPaths.GIFT_CARD_PAYMENT]: () =>
      router.push(redirectPaths.GIFT_CARD_PAYMENT),
  }

  const redirectToAction = action => redirectActions[action]()

  return {
    redirectProvider,
    setRedirectProvider,
    redirectToAction,
  }
}
