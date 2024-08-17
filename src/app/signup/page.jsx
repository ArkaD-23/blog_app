"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    secretKey: "",
  });

  const handleToggleChange = (e) => {
    setIsAdmin(e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.checked ? "admin" : "user",
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdmin && formData.secretKey !== process.env.SECRET_KEY) {
      setError("Wrong secret key. Please try again.");
      return;
    }

    setError(""); 

    try {
      const response = await fetch("https://blog-app-six-blond.vercel.app/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      router.push("/signin");
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="fname"
              name="fname"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="lname"
              name="lname"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="mr-2 text-gray-400">
              Admin
            </label>
            <input
              id="admin"
              value="admin"
              type="checkbox"
              onChange={handleToggleChange}
              className="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
            />
          </div>
          {isAdmin && (
            <div>
              <input
                id="secretKey"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Secret Key"
                onChange={handleChange}
              />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
