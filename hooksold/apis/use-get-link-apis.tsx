import { Apis } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export const useGetLinkApis = () => {
    const query = useQuery({
        queryKey: ['all-link-apis'],
        queryFn: async () => {
            const { data } = await Apis.fetchThirdPartyApi();
            return data;
        },
        enabled: true,
    });

    return {
        refetchLinkApis: query.refetch,
        isLoadingLinkApis: query.isLoading,
        linkApis: query.data
    };
};