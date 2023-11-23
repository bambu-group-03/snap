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

export const useSnaps = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/api/feed', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
      // primaryKey is 'posts' in this case
      const limit = 100;
      const offset = 0;
      const response = await client.get(
        `${primaryKey}/?user_id=${variables.user_id}&limit=${limit}&offset=${offset}`
      );
      console.log('response.data.snaps', response.data.snaps); // response.data is an array of posts
      return response.data.snaps;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const getSnap = createQuery<Response, SnapVariables, AxiosError>({
  primaryKey: '/api/feed/snap', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const response = await client.get(
        `${primaryKey}/${variables.snap_id}?user_id=${variables.user_id}`
      );
      console.log('response.data.snaps', response.data); // response.data is an array of posts
      return response.data;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const getSnapsFrom = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/api/feed', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
      // primaryKey is 'posts' in this case
      const limit = 100;
      const offset = 0;
      const response = await client.get(
        `${primaryKey}/${variables.user_id}/snaps?limit=${limit}&offset=${offset}`
      );
      console.log('response.data.snaps', response.data.snaps); // response.data is an array of posts
      return response.data.snaps;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const userReplySnaps = createQuery<Response, ReplyVariable, AxiosError>({
  primaryKey: '/api/feed', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, replyVariables] }) => {
    try {
      const response = await client.get(
        `${primaryKey}/get_replies?snap_id=${replyVariables.snap_id}&user_id=${replyVariables.user_id}`
      );
      console.log('response.data.snaps', response.data.snaps); // response.data is an array of posts
      return response.data.snaps;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const useMentions = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/api/interactions/mentions',
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const limit = 100;
      const offset = 0;
      const response = await client.get(
        `${primaryKey}/?user_id=${variables.user_id}&limit=${limit}&offset=${offset}`
      );
      console.log('response.data.mentions', response.data.mentions); // response.data is an array of posts
      return response.data.mentions;
    } catch (e) {
      console.log('error', e);
    }
  },
});

export const useNotifications = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/api/interactions/notifications',
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    try {
      const limit = 100;
      const offset = 0;
      const response = await client.get(
        `${primaryKey}/?user_id=${variables.user_id}&limit=${limit}&offset=${offset}`
      );
      console.log('response.data.notifications', response.data.notifications); // response.data is an array of posts
      return response.data.notifications;
    } catch (e) {
      console.log('error', e);
    }
  },
});
