export const useToggle = () => {
  const isOpen = ref<boolean>(false)
  const handleToggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    handleToggle,
  }
}
