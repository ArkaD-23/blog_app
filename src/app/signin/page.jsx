import Link from "next/link";
import React from "react";

const Signin = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
            <form className="space-y-6">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="password"
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
