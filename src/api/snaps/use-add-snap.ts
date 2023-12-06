import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { showMessage } from 'react-native-flash-message';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Snap } from './types';

type Variables = {
  user_id: string | undefined;
  parent_id: string | undefined;
  content: string;
  privacy: number;
};
type Response = Snap;

export const useAddSnap = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client
      .content({
        url: '/api/feed/post',
        method: 'POST',
        data: variables,
      })
      .then((response) => {
        console.log('response.data by useAddSnap', response.data);
        return response.data;
      }),
});

export const useAddReplyMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (variables: Variables) => {
    try {
      const response = await client.content({
        url: '/api/feed/reply',
        method: 'POST',
        data: variables,
      });

      // Invalidate the userReplySnaps query using the passed queryClient
      queryClient.invalidateQueries([
        '/api/feed',
        { snap_id: variables.parent_id, user_id: variables.user_id },
      ]);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return useMutation<Response, AxiosError, Variables>(mutationFn, {
    onSuccess: () => {
      showMessage({
        message: 'Reply added successfully',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Error adding reply',
        type: 'danger',
      });
    },
  });
};
