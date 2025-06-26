import { Wallet } from '@/apis';
import { IApiWalletTransactionRequest, IUserWalletTransactionRequest } from '@/apis/wallets';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreditUserWallet(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void,
    isApis: boolean = false,
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (txnBody: IUserWalletTransactionRequest | IApiWalletTransactionRequest) => {
            const { data } = await (isApis ? Wallet.api.creditApiWallet(txnBody as IApiWalletTransactionRequest) : Wallet.user.creditUserWallet(txnBody as IUserWalletTransactionRequest));
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['credit-wallet', isApis] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        credit: mutation.mutate,
        isCredting: mutation.isPending
    };
};