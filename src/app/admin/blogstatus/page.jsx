"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Blogstatus = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/viewpendingblogs");
        const data = await res.json();

        console.log("Fetched data:", data);
        if (Array.isArray(data.data)) {
          setBlogs(data.data);
          setLoading(false);
        } else {
          console.error("Expected an array in data.data but got:", data);
          setBlogs([]);
          setLoading(false);
          router.refresh();
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const updateBlogStatus = async (id, status, remarks) => {
    try {
      const res = await fetch("/api/blogstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status, remarks }),
      });
      const data = await res.json();

      console.log("Updated data:", data);

      if (data) {
        setBlogs(
          blogs.map((blog) => (blog.id === id ? { ...blog, status } : blog))
        );
        try {
          setLoading(true);
          const res = await fetch("/api/viewpendingblogs");
          const data = await res.json();

          console.log("Fetched data:", data);
          if (Array.isArray(data.data)) {
            setBlogs(data.data);
            setLoading(false);
          } else {
            console.error("Expected an array in data.data but got:", data);
            setBlogs([]);
            setLoading(false);
            router.refresh();
          }
        } catch (error) {
          console.error("Error fetching blogs:", error);
          setLoading(false);
        }
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
              <textarea
                className="w-full p-2 mb-4 text-black rounded-md"
                placeholder="Enter remarks for the author..."
                value={blog.remarks || ""}
                onChange={(e) =>
                  setBlogs(
                    blogs.map((b) =>
                      b.id === blog.id ? { ...b, remarks: e.target.value } : b
                    )
                  )
                }
              />
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  onClick={() =>
                    updateBlogStatus(blog.id, "accepted", blog.remarks)
                  }
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() =>
                    updateBlogStatus(blog.id, "rejected", blog.remarks)
                  }
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

export default Blogstatus;
