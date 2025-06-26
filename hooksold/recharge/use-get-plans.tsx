import { Recharge } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICirclesOperatorRes } from '@/apis/recharge';

export const useGetPlans = (operatorCode: string = '', circleCode: string = '', isDth = true) => {
    const query = useQuery({
        queryKey: ['plans', operatorCode, circleCode, isDth],
        queryFn: async () => {
            if (!operatorCode) return;
            if (!isDth && !circleCode) return;
            const data = isDth ? await Recharge.fetchDthPlansByThirdPartyProvider(operatorCode) : await Recharge.fetchPlansByThirdPartyProvider(operatorCode, circleCode);
            return data;
        },
        enabled: true,
    });

    return {
        plans: query.data,
        isLoadingPlans: query.isLoading,
        refetchPlans: query.refetch,
    };
};


// export const useGetCirclesAndOperators = (mobile: string = '') => {
//     const query = useQuery({
//         queryKey: ['fetch-circles-operators', mobile],
//         queryFn: async () => {
//             if (!mobile || mobile.length !== 10) return;
//             const data = await Recharge.fetchOperatorsNCircleByThirdPartyProvider(mobile.trim());
//             return data;
//         },
//         enabled: true,
//     });

//     return {
//         data: query.data,
//         isLoading: query.isLoading,
//         refetch: query.refetch,
//     };
// };



export interface ReqTypeOpCir {
    mobile: string;
    isDth: boolean;
}

export const useGetCirclesAndOperators = (
    onSuccessCb: (result: ICirclesOperatorRes | null | undefined) => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ICirclesOperatorRes | null, Error, any>({
        mutationFn: async ({ mobile, isDth }: ReqTypeOpCir) => {
            console.log('mobile, isDth', mobile, isDth);

            const fx = isDth ? Recharge.fetchOperatorsByThirdPartyProviderDth : Recharge.fetchOperatorsNCircleByThirdPartyProviderMobile;
            const { data } = await fx(mobile);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['fetch-op-apis'] });
            onSuccessCb(data);
        },
        onError: (error) => {
            onErrorCb(error.message);
        },
    });
    return {
        refetch: mutation.mutate,
        isLoading: mutation.isPending
    };
};