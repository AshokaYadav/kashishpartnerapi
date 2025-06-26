import { Category } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetAllCategories = () => {
    const query = useQuery({
      queryKey: ['categories'],
      queryFn: async () => {
        const {data} = await Category.fetchAllCategories();
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