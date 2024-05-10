export const useToggle = () => {
  const isOpen = useState('isOpen', () => false)
  const handleToggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    handleToggle,
  }
}
