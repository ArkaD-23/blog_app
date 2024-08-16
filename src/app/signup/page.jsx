import Link from "next/link";
import React from "react";

const Signup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
            <form className="space-y-6">
              <div>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="First Name"
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
                />
              </div>
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
