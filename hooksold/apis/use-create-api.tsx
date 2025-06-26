import { Apis } from '@/apis';
import { INewApi } from '@/apis/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function useCreateApi(
    onSuccessCb: () => void,
    onErrorCb: (error: string[]) => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (createData: INewApi) => {
            const { data } = await Apis.createApi({ ...createData });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-api'] });
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