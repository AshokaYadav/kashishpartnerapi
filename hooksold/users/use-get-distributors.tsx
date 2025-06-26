import { User } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetDistributors = () => {
    const query = useQuery({
        queryKey: ['all-distributors'],
        queryFn: async () => {
            const { data } = await User.fetchAllDistributors();
            return data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        distributors: query.data
    };
};