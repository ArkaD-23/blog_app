"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const res = await fetch(`https://blog-app-six-blond.vercel.app/api/getblog/${id}`);
                    const data = await res.json();
                    //console.log(data.data[0].id);
                    if (data && data.data) {
                        setBlog(data.data[0]);
                    } else {
                        console.error('Blog not found or error in fetching data:', data);
                    }
                } catch (error) {
                    console.error('Error fetching the blog:', error);
                }
            };
            
            fetchBlog();
        }
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            {blog ? (
                <div className="bg-white shadow-md p-6 rounded-md">
                    <h1 className="text-3xl text-black font-bold mb-4">{blog.title}</h1>
                    <p className="text-gray-600 mb-4">By {blog.author}</p>
                    <div className="prose max-w-full text-gray-700">
                        <p>{blog.content}</p>
                    </div>
                </div>
            ) : (
                <p>Loading blog...</p>
            )}
        </div>
    );
};

export default BlogPage;
