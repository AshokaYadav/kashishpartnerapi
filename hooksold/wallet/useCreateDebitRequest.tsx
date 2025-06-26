import { Wallet } from '@/apis';
import { IDebitResponse } from '@/apis/wallets/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export interface IDebitRequest {
    amount: number;
    upi: string;
}

export default function useCreateDebitRequest(
    onSuccessCb: (data?: IDebitResponse| null) => void,
    onErrorCb: (error: string[]) => void,
) {
    const queryClient = useQueryClient();

    const mutation = useMutation<IDebitResponse | null, Error, IDebitRequest>({
        mutationFn: async (debitRequest: IDebitRequest) => {
            const { data } = await Wallet.user.createDebitWalletRequest(debitRequest.upi, debitRequest.amount);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-wallet-debit-request'] });
            onSuccessCb(mutation.data);
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        createDebitRequest: mutation.mutate,
        isCreating: mutation.isPending
    };
};