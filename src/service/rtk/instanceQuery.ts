import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useUserStore } from '../../store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REST_URL,
 // headers: { 'Content-type': 'text/plain' },
  prepareHeaders: (headers) => { //
    const { token }  = useUserStore.getState().currentUser
   // headers.set("Content-Type", "application/json");
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryConfig: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, any> = async (
  args,
  api,
  extraOptions
) => {
  if (args == '') {
    return extraOptions
  }
  const result = await baseQuery(args, api, extraOptions);
  const cleanToken = useUserStore.getState().cleanToken
  if (result.error?.status === 401) {
    cleanToken()
  }
  return result;
};
