import { Wallet } from '@/apis';
import { IPaginationInfo } from '@/types/recharge';
import { useQuery } from '@tanstack/react-query';

export const useFetchDebits = (paginatedBody: IPaginationInfo) => {
    const query = useQuery({
        queryKey: ['debits-transactions', paginatedBody],
        queryFn: async () => {
            const { data } = await Wallet.transactions.fetchDebits(paginatedBody);
            return data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        data: query.data
    };
};