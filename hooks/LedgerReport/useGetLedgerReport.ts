import { fundRequest } from "@/apis/fundRequest";
import { LegderReport } from "@/apis/LedgerReport";
import { isPending } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";


const useGetLedgerReports = () => {
    const mutation = useMutation({
        mutationFn: async(payload: string) => {
            const data = LegderReport.getLedgerReport(payload);
            return data;
        }
    })


    return {
        mutate:mutation.mutate,
        isPending:mutation.isPending,
        data:mutation.data,
        error:mutation.error
    }


}

export default useGetLedgerReports

