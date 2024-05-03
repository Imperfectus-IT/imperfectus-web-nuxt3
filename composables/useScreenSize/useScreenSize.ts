import { ref, watchEffect } from 'vue'

export const useScreenSize = () => {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const updateMatches = () => {
    if (typeof window !== 'undefined') {
      isMobile.value = window.matchMedia('(max-width: 767px)').matches
      isTablet.value = window.matchMedia(
        '(min-width: 768px) and (max-width: 1023px)',
      ).matches
      isDesktop.value = window.matchMedia('(min-width: 1024px)').matches
    }
  }

  watchEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateMatches)
      updateMatches()
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateMatches)
      }
    }
  })

  return { isMobile, isTablet, isDesktop }
}
