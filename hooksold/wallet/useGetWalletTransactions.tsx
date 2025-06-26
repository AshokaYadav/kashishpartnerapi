import { Wallet } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetUsersWalletsTransaction = () => {
    const query = useQuery({
        queryKey: ['users-wallet-transactions'],
        queryFn: async () => {
            const { data } = await Wallet.user.fetchUserWalletsWithTransaction();
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