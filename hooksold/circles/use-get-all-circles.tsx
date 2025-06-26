import { Circles } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetAllCircles = () => {
    const query = useQuery({
      queryKey: ['circles'],
      queryFn: async () => {
        const {data} = await Circles.fetchAllCircles();
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