// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/apis';
import { INewUserRequest } from '@/apis/user';



export interface IUpdateUserReq {
    id: string;
    [key: string]: any;
}

export const useUpdateUser = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (payload: IUpdateUserReq) => {
            const { id, ...rest } = payload;
            const { data } = await User.updateUser(id, rest);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-user'] });
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