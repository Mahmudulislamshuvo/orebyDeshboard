import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exclusiveApi = createApi({
  reducerPath: "exclusiveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["banner"],
  endpoints: (builder) => ({
    uploadBanner: builder.mutation({
      query: (data) => ({
        url: "banner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),
    GetAllBanner: builder.query({
      query: () => "banner",
      providesTags: ["banner"],
    }),
    UpdateBanner: builder.query({
      query: ({ data, id }) => ({
        url: `banner/:${id}`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["banner"],
    }),
  }),
});

export const {
  useUploadBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
} = exclusiveApi;
