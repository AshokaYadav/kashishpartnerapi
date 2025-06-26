import { Wallet } from '@/apis';
import { IUpdateApi } from '@/apis/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useUpdateDebits(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (createData: IUpdateApi) => {
            const { data } = await Wallet.transactions.updateDebits(createData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-debits'] });
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