import middlewareApi from "../middlewareApi.ts";
import { IDep, IRole, IUser, IUserCounts } from "../../../interfaces/data.ts";

const path: string = '/user/';

const userApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    getUsersAllAccessed: builder.query<IUser[], void>({
      query: () => ({
        url: `${path}all`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getUsersAllOwners: builder.query<IUser[], void>({
      query: () => ({
        url: `${path}owners_all`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getUserCounts: builder.query<IUserCounts[], void>({
      query: () => ({
        url: `${path}user_counts`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getRoleAll: builder.query<IRole[], void>({
      query: () => ({
        url: `${path}role_all`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    saveUser: builder.mutation<IUser, IUser>({
      query: (body) => ({
        url: `${path}save`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user'],
    }),
    getDepsAll: builder.query<IDep[], void>({
      query: () => ({
        url: `${path}dep_all`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
  })
})

export const {
  useGetUsersAllAccessedQuery,
  useGetRoleAllQuery,
  useGetUsersAllOwnersQuery,
  useGetUserCountsQuery,
  useSaveUserMutation,
  useGetDepsAllQuery
} = userApi