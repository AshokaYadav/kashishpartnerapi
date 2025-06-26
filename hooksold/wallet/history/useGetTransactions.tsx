import { Wallet } from '@/apis';
import { IPagintatedTxnRequest, PaginatedWalletTxnsReponse } from '@/apis/wallets/transactions';
import { useQuery } from '@tanstack/react-query';

interface UseGetTransactionsParams extends IPagintatedTxnRequest {
    isApisWallet?: boolean;
}

export const useGetTransactions = (params: UseGetTransactionsParams) => {
    const { isApisWallet = false, ...requestParams } = params;

    const query = useQuery({
        queryKey: ['wallet-transactions-history', isApisWallet, requestParams],
        queryFn: async () => {
            if(!params || !params.id) return {data : []};
            if (isApisWallet) {
                const { data } = await Wallet.transactions.fetchApiWalletTransactionHistories(requestParams);
                return data;
            } else {
                const { data } = await Wallet.transactions.fetchUserWalletTransactionHistories(requestParams);
                return data;
            }
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        data: query.data as PaginatedWalletTxnsReponse | null
    };
};