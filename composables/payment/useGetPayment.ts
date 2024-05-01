import type { Payment } from "./types/Payment.ts";
const paymentMethods = ref<Payment[]>([]);
export const useGetPayment = async () => {
    const { findPaymentByAuthenticatedUser } = usePaymentRepository();
    const fetchPaymentMethods = async (): Promise<void> => {
        paymentMethods.value = await findPaymentByAuthenticatedUser();
    }

    onMounted(async () => {
        await fetchPaymentMethods();
    })

    return {
        paymentMethods,
        fetchPaymentMethods
    }
};
