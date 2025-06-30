import { axiosInstance } from "@/lib/axios";

export interface ProfileFormData {
  name: string;
  email: string;
  mobileno: string;
  city: string;
  shopName: string;
  aadharCardNumber: string;
  panCardNumber: string;
  udhyamAadharNumber: string;
  gstRegistrationNumber: string;
  businessType: string;
}


export const Profile = {
  getProfileData: (id:string) => {
    return axiosInstance.get(`/api/user/${id}`);
  },
  putProfileData:(id:string,payload:ProfileFormData)=>{
    return  axiosInstance.put(`/api/user/${id}`,payload);
  }
}