import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import type { Notification } from '@/screens/notifications/types';

import { client } from '../common';
import type { Snap } from './types';

type Response = Snap[];
type Variables = { user_id: string | undefined }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them
type SnapVariables = {
  snap_id: string | undefined;
  user_id: string | undefined;
}; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them
type ReplyVariable = {
  snap_id: string | undefined;
  user_id: string | undefined;
};
interface SnapsResponse {
  snaps: Snap[];
}

interface SnapsVariables {
  userId: string | undefined;
  limit: number;
  offset: number;
}

export const useSnaps = (variables: SnapsVariables) => {
  return useInfiniteQuery<SnapsResponse, AxiosError, SnapsResponse>(
    ['snaps', variables.userId],
    async ({ pageParam = 0 }) => {
      const { data } = await client.content.get<SnapsResponse>(
        `/api/feed/?user_id=${variables.userId}&limit=${variables.limit}&offset=${pageParam}`
      );
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.snaps.length === 0) {
          return undefined; // no more pages
        }
        return allPages.length * variables.limit; // Calculate the next offset
      },
    }
  );
};

export const useSnapsFrom = (variables: SnapsVariables) => {
  return useInfiniteQuery<SnapsResponse, AxiosError, SnapsResponse>(
    ['snapsProfile', variables.userId],
    async ({ pageParam = 0 }) => {
      const { data } = await client.content.get<SnapsResponse>(
        `/api/feed/${variables.userId}/snaps_and_shares?limit=${variables.limit}&offset=${pageParam}`
      );
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.snaps.length === 0) {
          return undefined; // no more pages
        }
        return allPages.length * variables.limit; // Calculate the next offset
      },
    }
  );
};
export const useSnapSharedByMeFrom = (variables: SnapsVariables) => {
  return useInfiniteQuery<SnapsResponse, AxiosError, SnapsResponse>(
    ['snapsProfile', variables.userId],
    async ({ pageParam = 0 }) => {
      const { data } = await client.content.get<SnapsResponse>(
        `/api/feed/${variables.userId}/shares?limit=${variables.limit}&offset=${pageParam}`
      );
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.snaps.length === 0) {
          return undefined; // no more pages
        }
        return allPages.length * variables.limit; // Calculate the next offset
      },
    }
  );
};

export const getSnap = createQuery<Snap, SnapVariables, AxiosError>({
  primaryKey: '/api/feed/snap', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const response = await client.content.get(
        `${primaryKey}/${variables.snap_id}?user_id=${variables.user_id}`
      );
      // console.log('response.data.snaps', response.data); // response.data is an array of posts
      return response.data;
    } catch (e) {
      console.log('error', e);
    }
  },
});

type UpdateSnapArgs = {
  user_id: string;
  snap_id: string;
  content: string;
};
type SnapsFeedResponse = {
  pages: Array<{
    snaps: Snap[];
  }>;
};
type SnapQueryFeedKey = ['snaps', string | undefined];
/**
 * Custom hook to update a snap.
 * This hook uses optimistic UI update to immediately reflect changes in the UI
 * and then syncs with the server.
 *
 * @returns The mutation object with methods to trigger the update.
 */
export const useUpdateSnapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ user_id, snap_id, content }: UpdateSnapArgs) =>
      // API call to update the snap
      client.content.put(`/api/feed/update_snap`, {
        user_id,
        snap_id,
        content,
      }),
    {
      // Optimistically update the UI before the server responds
      onMutate: async (updatedSnap: UpdateSnapArgs) => {
        await queryClient.cancelQueries(['snaps', updatedSnap.user_id]);

        const previousSnaps = queryClient.getQueryData<SnapsFeedResponse>([
          'snaps',
          updatedSnap.user_id,
        ]);

        queryClient.setQueryData<SnapsFeedResponse>(
          ['snaps', updatedSnap.user_id],
          (old) => {
            if (!old) return;

            const newPages = old.pages.map((page) => ({
              ...page,
              snaps: page.snaps.map((snap) =>
                snap.id === updatedSnap.snap_id
                  ? { ...snap, content: updatedSnap.content }
                  : snap
              ),
            }));

            return { ...old, pages: newPages };
          }
        );

        return { previousSnaps };
      },
      onSuccess: () => {
        // Invalidate and refetch the snaps query to ensure data consistency
        queryClient.invalidateQueries(['snaps']);
      },
      onError: (error: AxiosError, variables: UpdateSnapArgs, context: any) => {
        // Rollback the optimistic update in case of error
        if (context?.previousSnaps) {
          queryClient.setQueryData(
            ['snaps', variables.user_id],
            context.previousSnaps
          );
        }
      },
    }
  );
};

/**
 * Custom hook to delete a snap.
 * It uses optimistic UI updates to remove the snap from the UI immediately
 * before confirming the deletion from the server.
 *
 * @param userId The ID of the user performing the deletion.
 * @returns The mutation object with methods to trigger the deletion.
 */
export const useDeleteSnapMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (snap_id: string) =>
      // API call to delete the snap
      client.content.delete(`/api/feed/snap/${snap_id}`),
    {
      // Optimistically update the UI before the server responds
      onMutate: async (snapId: string) => {
        const queryKey: SnapQueryFeedKey = ['snaps', userId];
        await queryClient.cancelQueries(queryKey);

        const previousSnaps =
          queryClient.getQueryData<SnapsFeedResponse>(queryKey);

        queryClient.setQueryData<SnapsFeedResponse>(queryKey, (old) => ({
          ...old,
          pages:
            old?.pages.map((page) => ({
              ...page,
              snaps: page.snaps.filter((snap) => snap.id !== snapId),
            })) ?? [],
        }));

        return { previousSnaps };
      },
      onSuccess: () => {
        // Invalidate and refetch the snaps query to ensure data consistency
        const queryKey: SnapQueryFeedKey = ['snaps', userId];
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: AxiosError, snapId: string, context: any) => {
        // Rollback the optimistic update in case of error
        if (context?.previousSnaps) {
          const queryKey: SnapQueryFeedKey = ['snaps', userId];
          queryClient.setQueryData(queryKey, context.previousSnaps);
        }
      },
    }
  );
};

export const userReplySnaps = createQuery<Response, ReplyVariable, AxiosError>({
  primaryKey: '/api/feed', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, replyVariables] }) => {
    try {
      const response = await client.content.get(
        `${primaryKey}/get_replies?snap_id=${replyVariables.snap_id}&user_id=${replyVariables.user_id}`
      );
      // console.log('response.data.snaps', response.data.snaps); // response.data is an array of posts
      return response.data.snaps;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const useMentions = createQuery<Response, Variables, Error>({
  primaryKey: '/api/interactions/mentions',
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      // const limit = 100;
      // const offset = 0;
      const response = await client.content.get(
        `${primaryKey}/${variables.user_id}`
      );
      // console.log('response.data.snaps', response.data.snaps); // response.data is an array of posts
      return response.data.snaps;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const useNotifications = createQuery<
  Notification[],
  Variables,
  AxiosError
>({
  primaryKey: '/api/notification',
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const response = await client.identity.get(
        `${primaryKey}/${variables.user_id}`
      );
      // console.log('response.data.notifications', response.data); // response.data is an array of posts
      return response.data;
    } catch (e) {
      console.log('error', e);
    }
  },
});
