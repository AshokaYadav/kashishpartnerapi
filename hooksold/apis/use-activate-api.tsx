import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Apis } from '@/apis';


export default function useActivateApi(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string = '') => {
            console.log('activating');
            const { data } = await Apis.activateApi(id);
            console.log('result', data);
            return data;
        },
        onSuccess: () => {
            console.log('onSuce');
            queryClient.invalidateQueries({ queryKey: ['activate-apis'] });
            onSuccessCb();
        },
        onError: (error) => {
            console.log('onErr');
            onErrorCb([error.message]);
        },

    });
    return {
        activate: mutation.mutate,
        isActivating: mutation.isPending
    };
};