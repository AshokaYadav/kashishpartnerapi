// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@/apis';



export const useDeleteCategory = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await Category.deleteCategories(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delete-category'] });
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