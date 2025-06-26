import { Stats } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetSuccessRateRecharge = () => {
    const query = useQuery({
        queryKey: ['success-rate'],
        queryFn: async () => {
            const { data } = await Stats.fetchRechargeSuccessRate();
            return data[0];
        },
    });

    return { data: query.data, refetch: query.refetch, isLoading: query.isLoading };
};