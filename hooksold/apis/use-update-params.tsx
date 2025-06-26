import { Apis } from '@/apis';
import { IUpdateParams } from '@/apis/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useUpdateApiParams(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (createData: IUpdateParams) => {
            const { data, err } = await Apis.updateParams({ ...createData });
            if (!err) return createData;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-api-params'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb([error.message]);
        },

    });
    return {
        data: mutation.data,
        update: mutation.mutate,
        isUpdating: mutation.isPending
    };
};