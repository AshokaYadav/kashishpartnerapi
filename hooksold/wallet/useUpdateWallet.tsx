import { Apis } from '@/apis';
import { IUpdateApi } from '@/apis/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useUpdateApi(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (createData: IUpdateApi) => {
            const { data } = await Apis.updateApi({ ...createData });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-api'] });
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