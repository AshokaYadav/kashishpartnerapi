import { Wallet } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetApisWalletsTransaction = () => {
    const query = useQuery({
        queryKey: ['apis-wallet-transactions'],
        queryFn: async () => {
            const { data } = await Wallet.api.fetchApisWalletsWithTransaction();
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