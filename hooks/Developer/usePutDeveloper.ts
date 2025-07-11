import { developerApi, developerPayload } from '@/apis/Developer'
import { useMutation } from '@tanstack/react-query'

const usePutDeveloper = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: developerPayload }) => {
      return developerApi.developerPut(id, payload);
    }
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    data: mutation.data,
    error: mutation.error
  };
};

export default usePutDeveloper;
