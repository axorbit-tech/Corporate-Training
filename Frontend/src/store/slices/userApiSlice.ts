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
            query: () => ({
                url: "/event",
                method: HttpMethod.GET,
            }),
        }),

        getEventDetails: builder.query({
            query: (id) => ({
                url: `/event/${id}`,
                method: HttpMethod.GET,
            }),
        }),
    }),
});

export const {
    useCreateEnquiryMutation,
    useGetServicesQuery,
    useGetServiceDetailsQuery,
    useGetBlogsQuery,
    useGetBlogDetailsQuery,
    useGetEventsQuery,
    useGetEventDetailsQuery
} = userApiSlices;
