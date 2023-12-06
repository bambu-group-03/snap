import 'react-native-get-random-values';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { showMessage } from 'react-native-flash-message';
import { v4 as uuidv4 } from 'uuid';

import type { UserType } from '@/core/auth/utils';

import { client } from '../common';
import type { Snap } from './types';

type Variables = {
  user_id: string | undefined;
  parent_id: string | undefined;
  content: string;
  privacy: number;
};
type Response = Snap;

type SnapsFeedResponse = {
  pages: Array<{
    snaps: Snap[];
  }>;
};

type SnapQueryFeedKey = ['snaps', string | undefined];

/**
 * Custom hook to add a new snap.
 * It uses optimistic UI updates to add the new snap to the UI before the server confirms.
 *
 * @param userId - The ID of the user adding the snap.
 * @returns The mutation object with methods to trigger the addition.
 */
export const useAddSnap = (user: UserType | undefined) => {
  const queryClient = useQueryClient();

  return useMutation(
    (variables: Variables) =>
      // API call to post the new snap
      client.content.post('/api/feed/post', variables).then((response) => {
        console.log('response.data by useAddSnap', response.data);
        return response.data;
      }),
    {
      // Optimistically update the UI before the server responds
      onMutate: async (newSnapData: Variables) => {
        // Define the query key based on the user ID
        const queryKey: SnapQueryFeedKey = ['snaps', user?.id];
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(queryKey);

        // Snapshot the previous value
        const previousSnaps =
          queryClient.getQueryData<SnapsFeedResponse>(queryKey);

        // Optimistically update to the new value
        queryClient.setQueryData<SnapsFeedResponse>(queryKey, (old) => {
          const tempId = uuidv4();
          const newSnap: Snap = {
            id: tempId,
            ...newSnapData,
            author: user!.id,
            fullname: `${user!.first_name || ''} ${user!.last_name || ''}`,
            profile_photo_url: user!.profile_photo_id || '',
            username: user!.username || '',
            created_at: new Date().toISOString(),
            // Set default values for other properties
            favs: 0,
            has_faved: false,
            has_liked: false,
            has_shared: false,
            is_shared_by: [],
            likes: 0,
            num_replies: 0,
            parent_id: '',
            shares: 0,
            visibility: newSnapData.privacy,
          };
          console.log('newSnap by useAddSnap', newSnap);
          return {
            ...old,
            pages: [
              { snaps: [newSnap, ...(old?.pages[0].snaps || [])] },
              ...(old?.pages.slice(1) || []),
            ],
          };
        });

        return { previousSnaps };
      },
      onSuccess: () => {
        const queryKey: SnapQueryFeedKey = ['snaps', user!.id];
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: AxiosError, newSnapData: Variables, context: any) => {
        if (context?.previousSnaps) {
          const queryKey: SnapQueryFeedKey = ['snaps', user!.id];
          queryClient.setQueryData(queryKey, context.previousSnaps);
        }
      },
    }
  );
};

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
