import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

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
    ['snaps', variables.userId],
    async ({ pageParam = 0 }) => {
      const { data } = await client.content.get<SnapsResponse>(
        `/api/feed/${variables.userId}/snaps?limit=${variables.limit}&offset=${pageParam}`
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

export const getSnap = createQuery<Response, SnapVariables, AxiosError>({
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

export const useNotifications = createQuery<Response, Variables, AxiosError>({
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
