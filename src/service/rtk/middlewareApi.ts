import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryConfig } from './instanceQuery';

export const middlewareApi = createApi({
  reducerPath: 'middlewareApi',
  baseQuery: baseQueryConfig,
  tagTypes: ['device', 'device_field', 'equipment', 'user', 'sim', 'safe'],
  endpoints: () => ({}),
});

export default middlewareApi;
