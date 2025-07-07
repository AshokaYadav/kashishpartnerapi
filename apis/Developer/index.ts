import { axiosInstance } from "@/lib/axios"

export interface developerPayload {
    callback: string,
    ip: string,
    auto_create: boolean
}

export const developerApi = {
    developerPut: (id: string, payload: developerPayload) => {
        return axiosInstance.put(`api/credentials/${id}`, payload);
    },

    developerGet: (id: string) => {
        return axiosInstance.get(`api/credentials/${id}`);
    }
}
