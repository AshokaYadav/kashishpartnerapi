// hooks/operator-apis/use-update-operator-api.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Recharge } from '@/apis';
import { ICompaint, INewComplaint } from '@/apis/recharge/history';
import { toast } from 'sonner';



export const useRaiseRechargeComplaint = (
    onSuccessCb: () => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (reqBody: INewComplaint) => {
            const { data } = await Recharge.history.createComplaint(reqBody)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['raise-complaint'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        raiseComplaint: mutation.mutate,
        isCreating: mutation.isPending
    };
};


export const useUpdateRechargeComplaint = (
    onSuccessCb: () => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (reqBody: ICompaint) => {
            const { data } = await Recharge.history.updateComplaint(reqBody)
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['update-complaint'] });
            onSuccessCb();
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        updateComplaint: mutation.mutate,
        isUpdating: mutation.isPending
    };
};

export const useGetRechargeComplaint = (
    onSuccessCb: (data: any) => void,
    onErrorCb: (error: string) => void
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await Recharge.history.fetchComplaint(id)
            Object.keys(data[1]||[]).forEach( (val: string) => toast('Complaint status Response', {description: `${val}: ${data[1][val]}` }))
            return data[1];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch-recharge-complaint'] });
            onSuccessCb(mutation.data);
        },
        onError: (error) => {
            onErrorCb(error.message);
        },

    });
    return {
        fetch: mutation.mutate,
        isLoading: mutation.isPending
    };
}; 