import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, HttpMethod } from "../../constants/index";

export const apiSlices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      const isAdminEndpoint =
        endpoint.includes("admin") ||
        endpoint === "fetchUsers" ||
        endpoint === "fetchUserDetails";

      const token = isAdminEndpoint
        ? localStorage.getItem("adminToken")
        : localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
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
      query: () => ({
        url: "/admin/service/:id",
        method: HttpMethod.GET,
      }),
    }),
    editService: builder.mutation({
      query: () => ({
        url: "/admin/service/:id",
        method: HttpMethod.PUT,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useAddServiceMutation,
  useGetServicesQuery,
  useAdminLoginMutation,
} = apiSlices;
