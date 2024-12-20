<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'

// Constants
const STEP_SHIPPING = 'StepShipping'

// Reactive State
const redirectProvider = ref<string | null>(null)

// Utilities
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()
const { redirectPaths } = useRedirectPaths()
const client = useStrapiClient()
const { authenticateProvider, setToken } = useStrapiAuth()

// Emit function
const emit = defineEmits(['nextStep'])

// Redirect Actions
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

// Function to handle redirection
const redirectToAction = (action: string) => {
  if (redirectActions[action]) {
    redirectActions[action]()
  }
}

// Google Authentication Callback
const googleCallback = async (): Promise<{ jwt: string, user: StrapiUser }> => {
  return await client('/auth/google/callback', {
    method: 'GET',
    query: { access_token: route.query.access_token },
  })
}

onMounted(async () => {
  try {
    const response: { jwt: string, user: StrapiUser } = await googleCallback()
    setToken(response.jwt)
    const user = useStrapiUser()
    user.value = response.user
  }
  catch (error) {
    console.error('Error', error)
  }
  const url = useCookie('redirect').value
  router.push(`${url}`)
})
</script>

<template>
  <p class="mt-20 text-center animate-bounce ">
    {{ $t('socialProvider.redirect') }}
  </p>
</template>
