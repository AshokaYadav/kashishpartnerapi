import { axiosInstance } from "@/lib/axios"



export const LegderReport={
    getLedgerReport:(id:string)=>{
       return  axiosInstance.get(`/api/history/user_id/${id}`)
    }
}