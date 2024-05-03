const isDialogOpen = ref(false)
export const useDialogService = () => {
  const openDialog = () => {
    isDialogOpen.value = true
  }

  const closeDialog = () => {
    isDialogOpen.value = false
  }

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
  }
}
