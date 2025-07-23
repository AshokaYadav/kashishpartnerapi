import { axiosInstance } from "@/lib/axios";


export interface DepositDetails {
  user_id: string;
  deposite_amount: string;
  payment_method: string; // optional enum-like suggestion
  bank_name: string;
  bank_utr: string;
  remark: string;
  date: string; // Can also be: Date, if you parse it later
}


export const fundRequest={
    getFundRequest:(id:string)=>{
       return  axiosInstance.get(`/api/fund/user_id/${id}`)
    },
     getBankRequest:()=>{
       return  axiosInstance.get(`/api/bank`)
    },
    postFundRequest:(payload:DepositDetails)=>{
        return axiosInstance.post('/api/fund',payload)
    }
}