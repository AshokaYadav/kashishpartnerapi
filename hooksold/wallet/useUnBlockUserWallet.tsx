import { Wallet } from '@/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useUnblockUserWallet(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await Wallet.user.unBlockUserWallet(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['unblock-user-wallet'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        unBlock: mutation.mutate,
        isUnblocking: mutation.isPending
    };
};