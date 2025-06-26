import { Wallet } from '@/apis';
import { IApiWalletTransactionRequest, IUserWalletTransactionRequest } from '@/apis/wallets';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDebitUserWallet(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void,
    isApis: boolean = false,
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (txnBody: IUserWalletTransactionRequest | IApiWalletTransactionRequest) => {
            const { data } = await (isApis ? Wallet.api.debitApiWallet(txnBody as IApiWalletTransactionRequest) : Wallet.user.debitUserWallet(txnBody as IUserWalletTransactionRequest));
            // const { data } = await Wallet.user.debitUserWallet(txnBody);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debit-wallet', isApis] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        debit: mutation.mutate,
        isDebiting: mutation.isPending
    };
};