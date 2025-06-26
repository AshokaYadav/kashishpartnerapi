import { Operators } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetActiveOperators = () => {
    const query = useQuery({
      queryKey: ['active-operators'],
      queryFn: async () => {
        const {data} = await Operators.fetchActiveOperators();
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