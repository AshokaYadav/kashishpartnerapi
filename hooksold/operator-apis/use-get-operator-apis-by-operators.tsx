import { OperatorApis } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetOperatorsApisByOperators = (ids: string[] = []) => {

  const query = useQuery({
    queryKey: ['operators-apis', ids],
    queryFn: async () => {
      const { data } = await OperatorApis.fetchOperatorApisByOperators(ids);
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