// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OperatorApis } from '@/apis';

export interface INewOperatorApiRequest {
    code: string,
    operator_id: string,
    api_id: string,
}

export interface IEditOperatorApiRequest extends INewOperatorApiRequest {
    id: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export interface ICreateOperatorApis {
    operator_apis: INewOperatorApiRequest[]
}

export const useCreateOperatorApi = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: ICreateOperatorApis) => {
            const { data } = await OperatorApis.createOperatorApis(updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-operator-apis'] });
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