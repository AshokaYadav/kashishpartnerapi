import { Apis } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetApis = () => {
    const query = useQuery({
        queryKey: ['apis'],
        queryFn: async () => {
            const { data } = await Apis.fetchAllApis();
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