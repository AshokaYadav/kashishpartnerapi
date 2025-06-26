import { OperatorsCommissions } from '@/apis';
import { useQuery } from '@tanstack/react-query';


export default function useGetOperatorCommissions(distributorId: string = '') {
    const query = useQuery({
        queryKey: ['operator-commissions', distributorId],
        queryFn: async () => {
            return (!distributorId || distributorId === '') ? [] : (await OperatorsCommissions.fetchAllOperatorsCommissions(distributorId)).data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        data: query.data
    };
}


