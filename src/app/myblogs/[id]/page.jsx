"use client";
import { useAppSelector } from "@/store/hooks/hooks";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = useParams(); 
  const {currentUser} = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/myblogs/${currentUser.id}`);
        const data = await res.json();
        if (data.status === 200) {
          setBlogs(data.data);
          console.log(blogs);
        } else {
          console.error("Error fetching user blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-md p-4 rounded-md">
              <h2 className="text-xl text-black font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <p className="text-sm text-gray-500 mb-4">Status: {blog.status}</p>
              <p className="text-sm text-gray-500 mb-4">Remarks from admin: {blog.remarks}</p>
              <p className="text-sm text-gray-500 mb-4">Created At: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No blogs created yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserBlogsPage;
