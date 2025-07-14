import { axiosInstance } from "@/lib/axios"

export type developerPayload =
  | { ip: string }
  | { callback: string };

export interface developerOtpPayload{
    mobileno:string
}

export interface developerOtpVerifyPayload{
    mobileno:string,
    otp:string
}

export const developerApi = {
    developerPut: (id: string, payload: developerPayload) => {
        return axiosInstance.put(`api/credentials/${id}`, payload);
    },

    developerGet: (id: string) => {
        return axiosInstance.get(`api/credentials/${id}`);
    },
    developerPostOtp:(payload:developerOtpPayload)=>{
        return axiosInstance.post('api/user/send-otp-client',payload)
    },
    developerPostOtpVerify:(payload:developerOtpVerifyPayload)=>{
        return axiosInstance.post('api/user/verify-otp-client',payload)
    },

}
