"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/viewpendingblogs");
        const data = await res.json();

        console.log("Fetched data:", data);

        // Access data.data if the API response structure is { status: number, data: Array }
        if (Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          console.error("Expected an array in data.data but got:", data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const updateBlogStatus = async (id, status) => {
    try {
      const res = await fetch("http://localhost:3000/api/blogstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();

      console.log("Updated data:", data);

      if (data) {
        setBlogs(
          blogs.map((blog) => (blog.id === id ? { ...blog, status } : blog))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link href={`/getblog/${blog.id}`}>
              <div key={blog.id} className="bg-white shadow-md p-4 rounded-md">
                <h2 className="text-xl text-black font-semibold mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-700 mb-4">{blog.content}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() => updateBlogStatus(blog.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => updateBlogStatus(blog.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No pending blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
