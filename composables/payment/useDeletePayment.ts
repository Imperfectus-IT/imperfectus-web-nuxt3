import type { Payment } from "./types/Payment";

export const useDeletePayment = () => {
    const handleDeletePayment = async (id: number) => {
        const toast = useToast();
        const {t} = useI18n();
        try {
            const paymentDeleted = await deletePaymentById(id);
            if (paymentDeleted?.id) {
                toast.add({
                    severity: 'success',
                    summary: t('profile.payment.deleteModal.title'),
                    detail: t('profile.payment.confirmDeleteModal.description'),
                    life: 3000
                });
            }
        } catch (e: any) {
            console.error(e);
            toast.add({
                severity: 'error',
                summary: t('profile.payment.deleteModal.title'),
                detail: e.message(),
                life: 3000
            });
        }
    }
    const deletePaymentById = async (id: number) => {
        const { delete: _delete } = useStrapi()
        return await _delete<Payment>('payments', id)
    };

    return {
        handleDeletePayment
    }
}
