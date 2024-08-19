"use client"
import { useAppSelector } from "@/store/hooks/hooks";
import React, { useState } from "react";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const {currentUser} = useAppSelector((state) => state.user);
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/createblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, status:"pending", userId: currentUser.id.toString()}),
      });

      const data = await response.json()

      if (data.status !== 200) {
        setMessage("Failed to publish blog !");
        setLoading(false);
        return;
      }
      setLoading(false);
      setMessage(data.message);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setMessage(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Create a New Blog</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the title of your blog"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Author Name
            </label>
            <input
              id="author"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Blog Content
            </label>
            <textarea
              id="content"
              rows="8"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your blog content here..."
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? "Please Wait....":"Publish Blog"}
            </button>
          </div>
        </form>
        {message ? <p>{message}</p> : ""}
      </div>
    </div>
  );
};

export default CreateBlog;
