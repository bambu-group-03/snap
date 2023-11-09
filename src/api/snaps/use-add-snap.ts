import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Snap } from './types';

type Variables = {
  user_id: string | undefined;
  parent_id: string | undefined;
  content: string;
};
type Response = Snap;

export const useAddSnap = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '/api/feed/post',
      method: 'POST',
      data: variables,
    }).then((response) => {
      console.log('response.data by useAddSnap', response.data);
      return response.data;
    }),
});
