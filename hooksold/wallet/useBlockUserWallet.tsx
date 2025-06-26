import { Wallet } from '@/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useBlockUserWallet(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await Wallet.user.blockUserWallet(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['block-user-wallet'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },
    });
    return {
        block: mutation.mutate,
        isBlocking: mutation.isPending
    };
};