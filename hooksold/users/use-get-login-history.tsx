import { User } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetLoginHistory = (id: string = 'self') => {
    const query = useQuery({
        queryKey: ['loginHistory'],
        queryFn: async () => {
            const { data } = await User.fetchUserLoginHistory(id);
            return data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        history: query.data
    };
};