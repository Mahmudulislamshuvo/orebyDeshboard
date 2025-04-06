import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exclusiveApi = createApi({
  reducerPath: "exclusiveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["banner", "category", "subcategory", "product"],
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
    GetUpdateCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    DeleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    GetAllSubCategory: builder.query({
      query: () => "subcategory",
      providesTags: ["subcategory"],
    }),
    GetSingleSubCategory: builder.query({
      query: (id) => `subcategory/${id}`,
      providesTags: ["subcategory"],
    }),
    UpdatingSubCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `subcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["subcategory"],
    }),
    SubCategoryDelete: builder.mutation({
      query: (id) => ({
        url: `subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subcategory"],
    }),
    CreateSubcategory: builder.mutation({
      query: (data) => ({
        url: `subcategory`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subcategory"],
    }),
    CreateProduct: builder.mutation({
      query: (data) => ({
        url: `product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    GetSingleCategory: builder.query({
      query: (id) => `category/${id}`,
      providesTags: ["category"],
    }),
    GetAllProducts: builder.query({
      query: () => "product",
      providesTags: ["product"],
    }),
    productDelete: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    GetSingleProduct: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["product"],
    }),
    UpdateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    GetAllOrders: builder.query({
      query: () => "/order",
    }),
    SingleOrder: builder.query({
      query: (id) => `/order/single/${id}`,
    }),
  }),
});

export const {
  useSingleOrderQuery,
  useGetAllOrdersQuery,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useProductDeleteMutation,
  useGetAllProductsQuery,
  useGetSingleCategoryQuery,
  useCreateProductMutation,
  useCreateSubcategoryMutation,
  useSubCategoryDeleteMutation,
  useUpdatingSubCategoryMutation,
  useGetSingleSubCategoryQuery,
  useDeleteCategoryMutation,
  useGetAllSubCategoryQuery,
  useGetUpdateCategoryMutation,
  useGetCreateCategoryMutation,
  useGetAllCategoryQuery,
  useDeleteBannerMutation,
  useUploadBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
} = exclusiveApi;
