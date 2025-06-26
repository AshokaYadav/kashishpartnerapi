// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Operators } from '@/apis';
import { IUpdateOperator } from '@/apis/operator';




export const useUpdateOperator = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: IUpdateOperator) => {
            const { data } = await Operators.updateOperator(updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-operator'] });
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