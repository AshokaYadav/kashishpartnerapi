import { Stats } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetOperatorRechargesFq = () => {
  const query = useQuery({
    queryKey: ['stats-operator-recharge'],
    queryFn: async () => {
      const { data } = await Stats.fetchOperatorRecharges();
      return data;
    },
  });

  return { data: query.data, refetch: query.refetch, isLoading: query.isLoading };
};