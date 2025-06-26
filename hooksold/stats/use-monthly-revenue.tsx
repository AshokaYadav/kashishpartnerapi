import { Stats } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetMonthlyRevenue = () => {
    const query = useQuery({
        queryKey: ['monthly-revenue'],
        queryFn: async () => {
            const { data } = await Stats.fetchMonthlyRevenue();
            return data;
        },
    });

    return {
        data: query.data,
        refetch: query.refetch,
    };
};