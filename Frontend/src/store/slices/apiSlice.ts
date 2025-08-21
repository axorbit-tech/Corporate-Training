import { createApi } from "@reduxjs/toolkit/query/react";
import { HttpMethod } from "../../constants/index";
import baseQueryWithAuthCheck from "../baseQueryWithAuthCheck";

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
      query: ({ id, data }) => ({
        url: `/admin/service/${id}`,
        method: HttpMethod.PUT,
        body: data,
      }),
    }),
    updateServiceStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/service/${id}`,
        method: HttpMethod.PATCH,
      }),
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/admin/service/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),

    getBlogs: builder.query({
      query: () => ({
        url: "/admin/blog",
        method: HttpMethod.GET,
      }),
    }),

    addBlog: builder.mutation({
      query: (postData) => ({
        url: "/admin/blog",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    getBlogDetails: builder.query({
      query: (id) => ({
        url: `/admin/blog/${id}`,
        method: HttpMethod.GET,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/admin/blog/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/blog/${id}`,
        method: HttpMethod.PUT,
        body: data,
      }),
    }),

    updateBlogStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/blog/${id}`,
        method: HttpMethod.PATCH,
      }),
    }),

    addEvent: builder.mutation({
      query: (postData) => ({
        url: "/admin/event",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    getEvents: builder.query({
      query: () => ({
        url: "/admin/event",
        method: HttpMethod.GET,
      }),
    }),
    getEventDetails: builder.query({
      query: (id) => ({
        url: `/admin/event/${id}`,
        method: HttpMethod.GET,
      }),
    }),
    editEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/event/${id}`,
        method: HttpMethod.PUT,
        body: data,
      }),
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/admin/event/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),

    updateEventStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/event/${id}`,
        method: HttpMethod.PATCH,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: `/admin/client`,
        method: HttpMethod.GET,
      }),
    }),
    getTrainers: builder.query({
      query: () => ({
        url: `/admin/trainer`,
        method: HttpMethod.GET,
      }),
    }),
    getRequestes: builder.query({
      query: () => ({
        url: `/admin/requests`,
        method: HttpMethod.GET,
      }),
    }),
    getTrainerDetails: builder.query({
      query: (id) => ({
        url: `/admin/trainer/${id}`,
        method: HttpMethod.GET,
      }),
    }),
    getBookings: builder.query({
      query: (filter) => ({
        url: `/admin/booking?filter=${filter}`,
        method: HttpMethod.GET,
      }),
    }),
    getBookingDetails: builder.query({
      query: (id) => ({
        url: `/admin/booking/${id}`,
        method: HttpMethod.GET,
      }),
    }),

    updateTrainerStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/trainer/${id}`,
        method: HttpMethod.PATCH,
        body: {status},   
      }),
    }),

    updateBookingStatus: builder.mutation({
      query: (data) => ({
        url: '/admin/booking',
        method: HttpMethod.PATCH,
        body: data,   
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
  useDeleteServiceMutation,
  useGetBlogsQuery,
  useAddBlogMutation,
  useGetBlogDetailsQuery,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useUpdateBlogStatusMutation,
  useAddEventMutation,
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useEditEventMutation,
  useDeleteEventMutation,
  useUpdateEventStatusMutation,
  useGetUsersQuery,
  useGetTrainersQuery,
  useGetRequestesQuery,
  useGetTrainerDetailsQuery,
  useUpdateTrainerStatusMutation,
  useGetBookingsQuery,
  useGetBookingDetailsQuery,
  useUpdateBookingStatusMutation
} = apiSlices;
