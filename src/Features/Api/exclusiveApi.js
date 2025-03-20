import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exclusiveApi = createApi({
  reducerPath: "exclusiveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["banner", "category"],
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
    UpdateBanner: builder.mutation({
      query: ({ data, id }) => ({
        url: `banner/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["banner"],
    }),
    DeleteBanner: builder.mutation({
      query: (id) => ({
        url: `banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
    GetAllCategory: builder.query({
      query: () => "category",
      providesTags: ["category"],
    }),
    GetCreateCategory: builder.mutation({
      query: (data) => ({
        url: `category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteBannerMutation,
  useUploadBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
} = exclusiveApi;
