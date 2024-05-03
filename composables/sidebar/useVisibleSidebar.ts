import { ref } from 'vue'

export const useVisibleSidebar = () => {
  const visible = ref(false)
  const toggleVisible = () => {
    visible.value = !visible.value
  }
  return { visible, toggleVisible }
}
