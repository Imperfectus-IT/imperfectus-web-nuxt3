export const useDeletePaymentHandler = () => {
    const { closeDialog } = useDialogService();
    const { t } = useI18n();
    const toast = useToast();
    const handleDeletePayment = async (id: number): Promise<void> => {
        const user = useStrapiUser();
        const { executeGetPaymentsFromUser } = useGetAllPayments();
        const { executeDeletePayment, } = useDeletePayment();
        const { successToast, errorToast } = useToastService();
        try {
            await executeDeletePayment(id);
            closeDialog();
            await executeGetPaymentsFromUser(user?.value?.id);
            successToast(toast, t('profile.payment.deleteModal.title'), t('profile.payment.confirmDeleteModal.description'));
        } catch (e) {
            console.error(e);
            closeDialog();
            errorToast(toast, t('profile.payment.deleteModal.title'), e);
        }
    };

    return {
        handleDeletePayment
    }
};
