import { Stats } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetCategoryRechargesFq = () => {
    const query = useQuery({
        queryKey: ['stats-category-recharge'],
        queryFn: async () => {
            const { data } = await Stats.fetchCategoryRecharges();
            return data;
        },
    });

    return { data: query.data, refetch: query.refetch, isLoading: query.isLoading };
};