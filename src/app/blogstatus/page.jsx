"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/viewpendingblogs");
        const data = await res.json();

        console.log("Fetched data:", data);
        if (Array.isArray(data.data)) {
          setBlogs(data.data);
          setLoading(false);
        } else {
          console.error("Expected an array in data.data but got:", data);
          setBlogs([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
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
        body: JSON.stringify({ id: id, status: status }),
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
            <div key={blog.id} className="bg-white shadow-md p-4 rounded-md">
              <Link href={`/getblog/${blog.id}`}>
                <h2 className="text-xl text-black font-semibold mb-2">
                  {blog.title}
                </h2>
              </Link>
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
          ))
        ) : (
          <p>{loading ? "Loading..." : "No pending blogs available."}</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
