import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Snap } from './types';

type Variables = { tweet_id: number };
type Response = Snap;

export const useSnap = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/api/feed/snap',
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return client.content
      .get(`${primaryKey}/${variables.tweet_id}`)
      .then((response) => response.data);
  },
});
