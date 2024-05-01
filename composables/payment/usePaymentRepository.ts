import type { Payment } from "./types/Payment.ts";

export const usePaymentRepository = () => {
    const findPaymentByAuthenticatedUser = async (): Promise<Payment[]> => {
        const { find } = useStrapi();
        const user = useStrapiUser();
        return await find<Payment[]>('payments', {user: user?.value?.id});
    };
    const deletePayment = async (id: number): Promise<Payment> => {
        const { delete: _delete } = useStrapi();
        return await _delete<Payment>('payments', id);
    };

    return {
        findPaymentByAuthenticatedUser,
        deletePayment
    };
};
