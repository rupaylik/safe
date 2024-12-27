import { IRequestLogin } from "../../../interfaces/request.ts";
import middlewareApi from "../middlewareApi.ts";

const path: string = '/auth/';
export const authApi = middlewareApi.injectEndpoints?.({
  endpoints: (builder) => ({
    authenticate: builder.mutation<string, IRequestLogin>({
      query: ({ username, password },) => ({
        headers: {'Content-type': 'application/json' },
        url: `${path}authenticate`,
        method: "POST",
        body: { userName: username, password },
        responseHandler: 'text'
      })
    }),
  }),
});

export const { useAuthenticateMutation } = authApi;