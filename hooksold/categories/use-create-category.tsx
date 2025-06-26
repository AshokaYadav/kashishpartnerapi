// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@/apis';
import { TNewCircleApiRequest } from '@/apis/circle';



export const useCreateCategory = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updateData: TNewCircleApiRequest) => {
            const { data } = await Category.createCategories({ categories: [updateData] });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-cateogry'] });
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