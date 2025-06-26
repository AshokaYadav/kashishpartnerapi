import { Operators } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetOperatorsByCategory = (id: string = '', all: boolean = false) => {

  const query = useQuery({
    queryKey: ['operators', id],
    queryFn: async () => {
      const promise = all ? Operators.fetchAllOperatorsByCategory(id) : Operators.fetchOperatorsByCategory(id);
      const { data } = await promise;
      console.log('operators', data);
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