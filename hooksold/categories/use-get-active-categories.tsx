import { Category } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetActiveCategories = () => {
    const query = useQuery({
      queryKey: ['active-categories'],
      queryFn: async () => {
        const {data} = await Category.fetchActiveCategories();
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