export const useDeletePaymentDialog = () => {
    const isVisibleDeletePaymentDialog = ref(false);

    const openDeletePaymentDialog = () => {
        isVisibleDeletePaymentDialog.value = true
    }

    const closeDeletePaymentDialog = () => {
        isVisibleDeletePaymentDialog.value = false
    }

    return {
        isVisibleDeletePaymentDialog,
        openDeletePaymentDialog,
        closeDeletePaymentDialog
    }
}
