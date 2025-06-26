import { User } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetRetailers = () => {
    const query = useQuery({
        queryKey: ['all-retailers'],
        queryFn: async () => {
            const { data } = await User.fetchAllRetailers();
            return data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        retailers: query.data
    };
};