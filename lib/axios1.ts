// import axios from "axios";
// import { store } from "@/store/store";
// import { logout } from "@/store/features/auth/authSlice";
// import { toast } from "sonner";

// const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://api.recharge.kashishindiapvtltd.com/";

// export const axiosInstance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 1000 * 60 * 10,
// });

// // Add token to requests
// axiosInstance.interceptors.request.use((config) => {
//   const token = store.getState().auth.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle 401 responses
// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.data.err) {
//       toast('Failed', {
//         description: response.data.err || 'Error in Request'
//       })
//     }
//     return response;
//   },
//   (error) => {
//     try {
//       toast('Error In Request', {
//         description: error?.response?.data?.err || error?.response?.data?.message || 'Request Failed'
//       })
//     }
//     catch ({ message }: any) {
//       console.error('error', message);
//       toast('Error', { description: 'failed to resolve response' })
//     }
//     console.log("error", error);
//     if (error.response?.status == 401) {
//       toast('Auth Expired', {
//         description: 'Login in to continue'
//       })
//       store.dispatch(logout());
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   }
// );
