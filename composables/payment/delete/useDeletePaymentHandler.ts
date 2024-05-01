export const useDeletePaymentHandler = () => {
    const { closeDialog } = useDialogService();
    const { t } = useI18n();
    const toast = useToast();
    const handleDeletePayment = async (id: number): Promise<void> => {
        const { executeDeletePayment } = useDeletePayment();
        const { canDeletePayment } = useDeletePaymentValidator();
        const { paymentMethods, fetchPaymentMethods } = await useGetPayment();
        const { successToast, errorToast } = useToastService();

        try {
            if (!canDeletePayment(paymentMethods.value)) {
                throw new Error('No puede borrar un pago si no tiene más de uno');
            }
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
