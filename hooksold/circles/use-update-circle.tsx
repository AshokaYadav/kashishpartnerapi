// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Circles } from '@/apis';
import { IUpdateCircle } from '@/apis/circle';




export const useUpdateCircle = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: IUpdateCircle) => {
            const { data } = await Circles.updateCircle(updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-circles'] });
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