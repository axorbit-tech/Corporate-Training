import { createApi } from "@reduxjs/toolkit/query/react";
import { HttpMethod } from "../../constants/index";
import  baseQueryWithAuthCheck from "../baseQueryWithAuthCheck"

export const apiSlices = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (postData) => ({
        url: "/signup",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    login: builder.mutation({
      query: (postData) => ({
        url: "/login",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    adminLogin: builder.mutation({
      query: (postData) => ({
        url: "/admin/login",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    addService: builder.mutation({
      query: (postData) => ({
        url: "/admin/service",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    getServices: builder.query({
      query: () => ({
        url: "/admin/service",
        method: HttpMethod.GET,
      }),
    }),
    getServiceDetails: builder.query({
      query: (id) => ({
        url: `/admin/service/${id}`,
        method: HttpMethod.GET,
      }),
    }),
    editService: builder.mutation({
      query: ({id, data}) => ({
        url: `/admin/service/${id}`,
        method: HttpMethod.PUT,
        body: data
      }),
    }),
    updateServiceStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/service/${id}`,
        method: HttpMethod.PATCH,
      }),
    }),
    getBlogs: builder.query({
      query: () => ({
        url: "/admin/blog",
        method: HttpMethod.GET,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useAddServiceMutation,
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useEditServiceMutation,
  useAdminLoginMutation,
  useUpdateServiceStatusMutation,
  useGetBlogsQuery
} = apiSlices;
