import middlewareApi from "../middlewareApi.ts";
import { ISim } from "../../../interfaces/data.ts";
import { IResponseByFilter } from "../../../interfaces/response.ts";
import { ISimFilterRequest } from "../../../interfaces/request.ts";

const path: string = '/sim/';

const simApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    getSims: builder.query<IResponseByFilter<ISim>, ISimFilterRequest | undefined>({
      query: (params) => ({
        url: `${path}filter`,
        params,
        method: 'GET',
      }),
      providesTags: ['sim'],
    }),
    getSimsForInventory: builder.mutation<IResponseByFilter<ISim>, ISimFilterRequest | undefined>({
      query: (filter) => ({
        url: `${path}filter`,
        params: { ...filter, forInventory: true },
        method: 'GET',
      }),
      invalidatesTags: ['sim'],
    }),
    saveSim: builder.mutation<ISim, ISim>({
      query: (body) => ({
        url: `${path}save`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['sim', 'user'],
    }),
    deleteSim: builder.mutation<IResponseByFilter<any>, { id: number, comment: string }>({
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
      invalidatesTags: ['sim', 'user'],
    }),
    startInventorySim: builder.mutation<void, string[]>({
      query: (body) => ({
        url: `${path}start_inventory`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['sim'],
    }),
    saveInventorySim: builder.mutation<void, number[]>({
      query: (body) => ({
        url: `${path}save_inventory`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['sim'],
    }),
    agreementDeleteSim: builder.mutation<void, number>({
      query: (id) => ({
        url: `${path}agreement_delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['sim'],
    }),
    getSimUserDateMissOrDepTransfer: builder.query<ISim[], string>({
      query: (depId) => ({
        url: `${path}date_miss_or_dep_transfer`,
        params: { depId },
        method: 'GET',
      }),
      providesTags: ['sim'],
    }),
  }),
});
export const {
  useGetSimsQuery,
  useSaveSimMutation,
  useGetSimsForInventoryMutation,
  useSaveInventorySimMutation,
  useStartInventorySimMutation,
  useDeleteSimMutation,
  useAgreementDeleteSimMutation,
  useGetSimUserDateMissOrDepTransferQuery,
} = simApi