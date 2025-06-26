import { axiosInstance } from "@/lib/axios";

type SendOtpPayload = {
  mobileno: string;
};
type VerifyOtpPayload = {
  mobileno: string;
  otp: string;
};

type PersonalDetail = {
  mobileno: string,
  email: string, // <- email ka type usually string hota hai
  name: string,
  token: string
}
export const Login = {
  sendLoginOtp: (payload: SendOtpPayload) => {
    return axiosInstance.post('/api/user/send-login', payload);
  },

   verifyOtp: (payload: VerifyOtpPayload) =>
    axiosInstance.post('/api/user/login', payload),


   sendRegisterOtp:(payload:SendOtpPayload)=>{
    return axiosInstance.post('/api/user/send-otp',payload);
   },

   verifyRegisterOtp:(payload:VerifyOtpPayload)=>{
    return axiosInstance.post('/api/user/verify-otp',payload);
   },

   submitPersonalDetail:(payload:PersonalDetail)=>{
    return axiosInstance.post('/api/user/create',payload)
   }
};
