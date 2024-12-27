import middlewareApi from "../middlewareApi.ts";
import { IDevice } from "../../../interfaces/data.ts";
import { IResponseByFilter } from "../../../interfaces/response.ts";
import { IDeviceFilterRequest } from "../../../interfaces/request.ts";

const path: string = '/device/';

const deviceApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    getDevice: builder.query<IDevice, number | string | undefined>({
      query: (id) => id
        ? {
          url: `${path}${id}`,
          method: 'GET',
        }
        : '',
      extraOptions: { data: undefined },
      providesTags: ['device'],
    }),
    getDevices: builder.query<IResponseByFilter<IDevice>, IDeviceFilterRequest | undefined>({
      query: (params) => ({
        url: `${path}filter`,
        params,
        method: 'GET',
      }),
      providesTags: ['device'],
    }),
    getDevicesForInventory: builder.mutation<IResponseByFilter<IDevice>, IDeviceFilterRequest | undefined>({
      query: (filter) => ({
        url: `${path}filter`,
        params: { ...filter, forInventory: true },
        method: 'GET',
      }),
      invalidatesTags: ['device'],
    }),
    saveDevice: builder.mutation<IDevice, IDevice>({
      query: (body) => ({
        url: `${path}save`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['device', 'user'],
    }),
    deleteDevice: builder.mutation<IResponseByFilter<any>, { id: number, comment: string }>({
      query: (params) => {
        if (!params.id) {
          return '';
        }
        return {
          url: `${path}${params.id}`,
          body: params.comment,
          method: 'DELETE',
        }
      },
      extraOptions: { data: {} },
      invalidatesTags: ['device', 'user'],
    }),
    startInventoryDevice: builder.mutation<void, string[]>({
      query: (body) => ({
        url: `${path}start_inventory`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['device'],
    }),
    saveInventoryDevice: builder.mutation<void, number[]>({
      query: (body) => ({
        url: `${path}save_inventory`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['device'],
    }),
    agreementDeleteDevice: builder.mutation<void, number>({
      query: (id) => ({
        url: `${path}agreement_delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['device'],
    }),
    getDeviceUserDateMissOrDepTransfer: builder.query<IDevice[], string>({
      query: (depId) => ({
        url: `${path}date_miss_or_dep_transfer`,
        params:{depId},
        method: 'GET',
      }),
      providesTags: ['device'],
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useDeleteDeviceMutation,
  useGetDevicesForInventoryMutation,
  useSaveDeviceMutation,
  useStartInventoryDeviceMutation,
  useSaveInventoryDeviceMutation,
  useAgreementDeleteDeviceMutation,
  useGetDeviceUserDateMissOrDepTransferQuery,
} = deviceApi