import middlewareApi from "../middlewareApi.ts";
import { IResponseByFilter } from "../../../interfaces/response.ts";
import { ILog } from "../../../interfaces/data.ts";
import { ILogFilterRequest } from "../../../interfaces/request.ts";

const path: string = '/log/';
const logApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    getLogging: builder.mutation<IResponseByFilter<ILog>, ILogFilterRequest | undefined>({
      query: (params) => ({
        url: `${path}filter`,
        params,
        method: 'GET',
      })
    })
  })
})

export const { useGetLoggingMutation } = logApi