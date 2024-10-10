export const useWindowSize = () => {
  const windowWidth = ref(window?.innerWidth)

  const updateWidth = () => {
    if (window) {
      windowWidth.value = window.innerWidth
    }
  }

  const addResize = () => window.addEventListener('resize', updateWidth)
  const removeResize = () => window.removeEventListener('resize', updateWidth)

  return { addResize, removeResize, windowWidth }
}
