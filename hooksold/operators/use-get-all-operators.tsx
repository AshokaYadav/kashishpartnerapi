import { Operators } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetAllOperators = () => {
    const query = useQuery({
      queryKey: ['operators'],
      queryFn: async () => {
        const {data} = await Operators.fetchAllOperators();
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