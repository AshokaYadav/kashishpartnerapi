import { Profile, ProfileFormData } from '@/apis/Profile';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

const usePutProfile = (id: string) => {
  const mutation = useMutation({
    mutationFn: async (payload: ProfileFormData) => {
      const response = await Profile.putProfileData(id, payload);
      return response.data;
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
};

export default usePutProfile;
