// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TNewCircleApiRequest } from '@/apis/circle';
import { Circles } from '@/apis';



export const useCreateCircle = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: TNewCircleApiRequest) => {
            const { data } = await Circles.createCircle({ states: [updateData] });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-circles'] });
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