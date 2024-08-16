"use client"
import { signInFailure, signInStart, signInSuccess } from "@/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

const Signin = () => {

  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {currentUser , loading} = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()

      if (!response.ok) {
        console.log("Failed to sign in. Please try again.");
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      router.push("/");
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
      dispatch(signInFailure(error));
      return;
    }
  }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-center text-gray-400">
              Don’t have an account?{" "}
              <Link href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
}

export default Signin;
