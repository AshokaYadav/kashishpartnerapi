import { User } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetActiveDecendets = () => {
    const query = useQuery({
        queryKey: ['active-decendents'],
        queryFn: async () => {
            const { data } = await User.countActiveDecendents();
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