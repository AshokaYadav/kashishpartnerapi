import { developerApi, developerOtpPayload, developerOtpVerifyPayload, developerPayload } from '@/apis/Developer'
import { useMutation } from '@tanstack/react-query'

const usePostVerifyDeveloper = () => {
  const mutation = useMutation({
    mutationFn: (payload:developerOtpVerifyPayload) => {
      return developerApi.developerPostOtpVerify(payload);
    }
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    data: mutation.data,
    error: mutation.error
  };
};

export default usePostVerifyDeveloper;
