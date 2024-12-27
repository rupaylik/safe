import middlewareApi from "../middlewareApi.ts";
import { ISafe } from "../../../interfaces/data.ts";

const path: string = '/safe/';

const safeApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    getSafeAll: builder.query<ISafe[], void>({
      query: () => ({
        url: `${path}all`,
        method: 'GET',
      }),
      providesTags: ['safe'],
    }),
    saveSafe: builder.mutation<ISafe, ISafe>({
      query: (body) => ({
        url: `${path}save`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['safe'],
    }),
  })
})
export const { useGetSafeAllQuery, useSaveSafeMutation } = safeApi