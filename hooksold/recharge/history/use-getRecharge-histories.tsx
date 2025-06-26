import { Recharge } from '@/apis';
import { IPaginationInfo } from '@/types/recharge';
import { useQuery } from '@tanstack/react-query';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Operators } from '@/apis';


export const useGetRechargeHistories = (paginatedBody: IPaginationInfo) => {
    const query = useQuery({
        queryKey: ['recharge-histories', paginatedBody],

        queryFn: async () => {
            const { data } = await Recharge.history.fetchRechargeHistories(paginatedBody);
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

export const useCheckRechargeStatus = (
    onSuccessCb: (data: any) => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string = '') => {
            const { data } = await Recharge.history.checkRechargeStatus(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['check-status'] });
            onSuccessCb(mutation.data);
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        checkStatus: mutation.mutate,
        isChecking: mutation.isPending,
    };
};