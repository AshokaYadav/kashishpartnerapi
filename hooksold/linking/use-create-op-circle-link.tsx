import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { OperatorCircleLink } from '@/apis';
import { ICreateOpCirLinkRequest, IUpdateOpCirLinkRequest } from '@/apis/op-circle-link';


export const useCreateOperatorCircleLink = (
    onSuccessCb: () => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (reqBody: ICreateOpCirLinkRequest) => {
            const { data } = await OperatorCircleLink.createOperatorCircleLink(reqBody);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-operator-circle-link'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        create: mutation.mutate,
        isCreating: mutation.isPending
    };
};


export const useUpdateCircleOperatorLinking = (
    onSuccessCb: () => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (reqBody: IUpdateOpCirLinkRequest) => {
            const { data } = await OperatorCircleLink.updateOperatorCircleLink(reqBody);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-operator-circle-link'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        update: mutation.mutate,
        isUpdating: mutation.isPending
    };
};

export const useGetAllCircleOperatorLinkings = () => {
    const query = useQuery({
        queryKey: ['operator-circle-link-all'],
        queryFn: async () => {
            const { data } = await OperatorCircleLink.fetchAllOperatorCircleLinks();
            return data;
        },
        enabled: true,
    });

    return {
        refetch: query.refetch,
        isLoading: query.isLoading,
        data: query.data
    };
};



export const useDeleteOpCircleLink = (
    onSuccessCb: () => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string = '') => {
            const { data } = await OperatorCircleLink.deleteOperatorCircleLink(id);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delete-operator-circle-link'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        delete : mutation.mutate,
        isDeleting: mutation.isPending
    };
};