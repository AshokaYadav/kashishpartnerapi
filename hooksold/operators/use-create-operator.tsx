// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Operators } from '@/apis';
import { INewOperatorRequest } from '@/apis/operator';



export const useCreateOperator = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: INewOperatorRequest) => {
            console.log(updateData);
            const { data } = await Operators.createOperators1({ operators: [updateData] });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-operator'] });
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