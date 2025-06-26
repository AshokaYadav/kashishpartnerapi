// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OperatorsCommissions } from '@/apis';

export interface INewOperatorCommissionRequest {
    operatorId: string,
    apiMargin: number,
    adminMargin: number,
    distributorMargin: number,
    retailerMargin: number
}

export interface IEditOperatorCommissionsRequest extends INewOperatorCommissionRequest {
    id: string;
    status: 'ACTIVE' | 'INACTIVE';
}



export const useUpdateOperatorCommission = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: IEditOperatorCommissionsRequest) => {
            const { data } = await OperatorsCommissions.updateOperatorCommission(updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-operator-commission'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        update: mutation.mutate,
        isUpdating: mutation.isPending
    };
};