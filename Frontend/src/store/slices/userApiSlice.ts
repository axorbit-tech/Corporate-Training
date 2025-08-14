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
    }),
});

export const {
    useCreateEnquiryMutation
} = userApiSlices;
