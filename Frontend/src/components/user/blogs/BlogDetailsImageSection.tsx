import React, { useEffect, useState } from 'react'
import { useGetBlogDetailsQuery } from '../../../store/slices/userApiSlice'
import { useParams } from "react-router-dom";
import { formatDate } from "../../../utils/fomatDate";
import type { IBlog } from '../../../types/types';
import LoaderComponent from '../../common/Loader';
import SomethingWentWrong from '../../common/error';

type BlogDetailsImageSectionParams = {
    id: string;
};


const BlogDetailsImageSection: React.FC = () => {


    const { id } = useParams<BlogDetailsImageSectionParams>();

    const { data: blogData, isLoading, error } = useGetBlogDetailsQuery(id)

    const [blog, setBlog] = useState<IBlog>()
    
    useEffect(()=> {
        setBlog(blogData?.data)
    },[blogData])



    if (isLoading) {
        return <LoaderComponent/>
    }

    if (error || !blog) {
        return <SomethingWentWrong/>
    }


    return (
        <section className="px-4 py-16 sm:px-6 sm:py-8 md:px-12 md:py-16 lg:px-20 lg:py-15">
            <div className="px-2 sm:px-4 sm:py-6 md:px-8 md:py-10 lg:px-12 lg:py-14">
                <img
                    src={blog?.image || "/placeholder.svg"}
                    alt={blog?.title}
                    className="w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-center"
                />

                <div className='mt-6 text-center'>
                    <h2 className="blog-details-heading text-xl sm:text-xl md:text-3xl font-bold mb-1">{blog?.title}</h2>
                    <div className="relative">
                        <p className="absolute top-1  text-sm text-gray-500">{formatDate(blog?.createdAt)}</p>

                    </div>
                    <p className="text-sm sm:text-sm md:text-base text-justify mt-10 whitespace-pre-line">
                        {blog?.content}
                    </p>
                </div>

            </div>
        </section>
    )
}

export default BlogDetailsImageSection