import { Stats } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetCircleRechargesFq = () => {
    const query = useQuery({
        queryKey: ['stats-circle-recharge'],
        queryFn: async () => {
            const { data } = await Stats.fetchCircleRecharges();
            return data;
        },
    });

    return { data: query.data, refetch: query.refetch, isLoading: query.isLoading };
};