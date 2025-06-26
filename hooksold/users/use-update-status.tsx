// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/apis';
import { INewUserRequest } from '@/apis/user';



export interface IUpdateUserStatusReq {
    id: string;
    status: boolean;
}

export const useUpdateUserStatus = (
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (payload: IUpdateUserStatusReq) => {
            const { id, status } = payload;
            const { data } = await User.updateUserStatus(id, status);
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
        updateStatus: mutation.mutate,
        isUpdatingStatus: mutation.isPending
    };
};