import type { Payment } from "./types/Payment.ts";

export const useGetPayment = () => {
    const getPaymentsFromAuthenticatedUser = async () => {
        const { find } = useStrapi();
        const user = useStrapiUser();
        return await find<Payment>('payments', {user: user.value.id});
    };

    return {
        getPaymentsFromAuthenticatedUser
    }
}
