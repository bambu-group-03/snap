import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Snap } from './types';

type Response = Snap[];
type Variables = { user_id: string | undefined }; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useSnaps = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/api/feed', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    const response = await client.get(
      `${primaryKey}/${variables.user_id}/snaps`
    );
    console.log('response.data.snaps', response.data.snaps); // response.data is an array of posts
    return response.data.snaps;
  },
});
