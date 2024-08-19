"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "@/store/features/user/userSlice.js";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [Loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `https://blog-app-vv3d.vercel.app/api/updateuser/${currentUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.status !== 200) {
        dispatch(updateUserFailure(data));
        setLoading(false);
        setError(data.message);
        return;
      }
      console.log(data.data);
      dispatch(updateUserSuccess(data.data));
      setError("");
      setLoading(false);
    } catch (error) {
      dispatch(updateUserFailure(error));
      setLoading(false);
      setError(error.message);
      return;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `https://blog-app-vv3d.vercel.app/api/deleteuser/${currentUser.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        console.log(data);
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
      console.log(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      await fetch("https://blog-app-vv3d.vercel.app/api/signout");
      dispatch(signOut());
      setError("");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Profile</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="fname"
              name="fname"
              type="text"
              defaultValue={currentUser ? currentUser.fname : ""}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="lname"
              name="lname"
              type="text"
              defaultValue={currentUser ? currentUser.lname : ""}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser ? currentUser.username : ""}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser ? currentUser.email : ""}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onCanPlay={handleChange}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue={""}
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Loading ? "Please Wait..." : "Update"}
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
        {error ? <p>{error}</p> : ""}
      </div>
    </div>
  );
};

export default Profile;
