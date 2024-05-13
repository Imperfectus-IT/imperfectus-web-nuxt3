export const useToggle = () => {
  const isOpen = ref<Boolean>(false)
  const handleToggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    handleToggle,
  }
}
