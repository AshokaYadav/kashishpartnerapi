// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Category, User } from '@/apis';
import { TNewCircleApiRequest } from '@/apis/circle';
import { INewUserRequest } from '@/apis/user';



export const useCreateUser = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newData: INewUserRequest) => {
            const { data } = await User.createNewUser(newData)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-user'] });
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