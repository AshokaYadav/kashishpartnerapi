import { User } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetNotifications = () => {
    const query = useQuery({
        queryKey: ['all-notifications'],
        queryFn: async () => {
            const { data } = await User.fetchNotifications();
            return data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        notifications: query.data
    };
};