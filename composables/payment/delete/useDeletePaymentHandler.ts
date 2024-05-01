export const useDeletePaymentHandler = () => {
    const { closeDialog } = useDialogService();
    const { t } = useI18n();
    const toast = useToast();
    const handleDeletePayment = async (id: number): Promise<void> => {
        const { executeDeletePayment } = useDeletePayment();
        const { fetchPaymentMethods } = await useGetPayment();
        const { successToast, errorToast } = useToastService();

        try {
            await executeDeletePayment(id);
            closeDialog();
            await fetchPaymentMethods();
            successToast(toast, t('profile.payment.deleteModal.title'), t('profile.payment.confirmDeleteModal.description'));
        } catch (e) {
            console.error(e);
            closeDialog();
            errorToast(toast, t('profile.payment.deleteModal.title'), e);
        }
    }

    return {
        handleDeletePayment
    }
};
