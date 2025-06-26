import { Circles } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetActiveCircles = () => {
    const query = useQuery({
      queryKey: ['active-circles'],
      queryFn: async () => {
        const {data} = await Circles.fetchActiveCircles();
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