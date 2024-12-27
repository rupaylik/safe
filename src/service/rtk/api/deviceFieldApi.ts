import middlewareApi from "../middlewareApi.ts";
import { IBrand, IOS } from "../../../interfaces/data.ts";

const path: string = '/device/';

const deviceFieldApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    getModels: builder.query<string[], void>({
      query: () => ({
        url: `${path}model_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
    getImeiAll: builder.query<string[], void>({
      query: () => ({
        url: `${path}imei_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
    getSnNumberAll: builder.query<string[], void>({
      query: () => ({
        url: `${path}sn_number_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
    getOses: builder.query<IOS[], void>({
      query: () => ({
        url: `${path}os_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
    saveOs: builder.mutation<IOS, IOS>({
      query: (body) => ({
        url: `${path}save_os`,
        body,
        method: 'PUT',
      }),
      invalidatesTags: ['device_field'],
    }),
    saveBrand: builder.mutation<IBrand, IBrand>({
      query: (body) => ({
        url: `${path}save_brand`,
        body,
        method: 'PUT',
      }),
      invalidatesTags: ['device_field'],
    }),
    getDisplaySizes: builder.query<number[], void>({
      query: () => ({
        url: `${path}display_size_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
    getPPIs: builder.query<number[], void>({
      query: () => ({
        url: `${path}ppi_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
    getBrands: builder.query<IBrand[], void>({
      query: () => ({
        url: `${path}brand_all`,
        method: 'GET',
      }),
      providesTags: ['device_field'],
    }),
  })
})
export const {
  useGetImeiAllQuery,
  useGetSnNumberAllQuery,
  useGetModelsQuery,
  useSaveBrandMutation,
  useGetOsesQuery,
  useSaveOsMutation,
  useGetBrandsQuery
} = deviceFieldApi