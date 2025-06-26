// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OperatorsCommissions } from '@/apis';

export interface INewOperatorCommissionRequest {
    operatorId: string,
    distributorId: string,
    apiMargin: number,
    adminMargin: number,
    distributorMargin: number,
    retailerMargin: number
}



export const useCreateOperatorCommission = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: INewOperatorCommissionRequest[]) => {
            const { data } = await OperatorsCommissions.createOperatorCommissions({ commissions: updateData });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-operator-commission'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        create: mutation.mutate,
        isCreating: mutation.isPending
    };
};