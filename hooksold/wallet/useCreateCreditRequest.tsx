import { Wallet } from '@/apis';
import { IPaymentCreateOrderData, IPaymentUrlResponse } from '@/apis/wallets/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateCreditRequest(
    onSuccessCb: (data?: IPaymentCreateOrderData) => void,
    onErrorCb: (error: string) => void,
) {
    const queryClient = useQueryClient();

    const mutation = useMutation<IPaymentCreateOrderData | undefined, Error, number>({
        mutationFn: async (amount: number = 0) => {
            const { data } = await Wallet.transactions.fetchCreditUrl(amount);
            return data?.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['get-credit-url'] });
            onSuccessCb(data);
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        getPaymentUrl: mutation.mutate,
        isFetchingPaymentUrl: mutation.isPending
    };
};