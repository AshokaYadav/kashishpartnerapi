// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Apis, User } from '@/apis';



export const useDeleteApi = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await Apis.deleteApi(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delete-api'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        delete: mutation.mutate,
        isDeleting: mutation.isPending
    };
};