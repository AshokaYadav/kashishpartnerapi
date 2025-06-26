// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/apis';
import { INewAdmin } from '@/apis/user';



export const useCreateAdmin = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newData: INewAdmin) => {
            const { data } = await User.registerAdmin(newData)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-admin'] });
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