import middlewareApi from "../middlewareApi.ts";
import { IType } from "../../../interfaces/data.ts";

const path: string = '/equipment/';

const equipmentApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    saveType: builder.mutation<IType, IType>({
      query: (body) => ({
        url: `${path}save_type`,
        body,
        method: 'PUT',
      }),
      invalidatesTags: ['equipment'],
    }),
    getTypes: builder.query<IType[], number>({
      query: (id) => ({
        url: `${path}types/${id}`,
        method: 'GET',
      }),
      providesTags: ['equipment'],
    }),
  })
})
export const {
  useGetTypesQuery,
  useSaveTypeMutation,
} = equipmentApi