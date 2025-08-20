import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, HttpMethod } from "../../constants/index";



export const userApiSlices = createApi({
    reducerPath: "usrerApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: (builder) => ({
        createEnquiry: builder.mutation({
            query: (postData) => ({
                url: "/enquiry",
                method: HttpMethod.POST,
                body: postData,
            }),
        }),

        getServices: builder.query({
            query: () => ({
                url: "/service",
                method: HttpMethod.GET,
            }),
        }),

        getServiceDetails: builder.query({
            query: (id) => ({
                url: `/service/${id}`,
                method: HttpMethod.GET,
            }),
        }),

        getBlogs: builder.query({
            query: () => ({
                url: "/blog",
                method: HttpMethod.GET,
            }),
        }),

        getBlogDetails: builder.query({
            query: (id) => ({
                url: `/blog/${id}`,
                method: HttpMethod.GET,
            }),
        }),

        getEvents: builder.query({
            query: ({ page, limit }: { page: number; limit: number }) => ({
                url: `/event?page=${page}&limit=${limit}`,
                method: HttpMethod.GET,
            }),
        }),

        getEventDetails: builder.query({
            query: (id) => ({
                url: `/event/${id}`,
                method: HttpMethod.GET,
            }),
        }),


         createBooking: builder.mutation({
            query: (postData) => ({
                url: "/booking",
                method: HttpMethod.POST,
                body: postData,
            }),
        }),

        trainerRegister : builder.mutation({
            query: (postData) => ({
                url: '/trainer-registration',
                method: HttpMethod.POST,
                body: postData
            })
        })

    }),
});

export const {
    useCreateEnquiryMutation,
    useGetServicesQuery,
    useGetServiceDetailsQuery,
    useGetBlogsQuery,
    useGetBlogDetailsQuery,
    useGetEventsQuery,
    useGetEventDetailsQuery,
    useCreateBookingMutation,
    useTrainerRegisterMutation
} = userApiSlices;
