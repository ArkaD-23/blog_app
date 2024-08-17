"use client"
import React from "react";
import Link from "next/link"

const Profile = () => {

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3000/api/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch(`http://localhost:3000/api/signout/${currentUser._id}`);
      dispatch(signOut());
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Profile</h2>
        <form className="space-y-6">
          <div>
            <input
              id="fname"
              name="fname"
              type="text"
              value="John"
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <input
              id="lname"
              name="lname"
              type="text"
              value="Doe"
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              value="johndoe"
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value="john.doe@example.com"
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value="********"
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
        <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.25rem",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "#DC2626",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Link>

              <Link
                href="/signin"
                onClick={handleSignout}
                style={{
                  color: "#DC2626",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Sign Out
              </Link>
            </div>
      </div>
    </div>
  );
};

export default Profile;
