import { developerApi, developerOtpPayload, developerPayload } from '@/apis/Developer'
import { useMutation } from '@tanstack/react-query'

const usePostDeveloper = () => {
  const mutation = useMutation({
    mutationFn: (payload:developerOtpPayload) => {
      return developerApi.developerPostOtp(payload);
    }
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    data: mutation.data,
    error: mutation.error
  };
};

export default usePostDeveloper;
