"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/hooks";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <ul className="flex-1 flex justify-start items-center space-x-4">
            {currentUser ? (
              <Link href={`/profile/${currentUser.id}`}>
                <li className="px-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">P</span>
                  </div>
                </li>
              </Link>
            ) : (
              <Link href="/signin">
                <li className="text-white-800 hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium">
                  Signin
                </li>
              </Link>
            )}
            <div className="hidden md:flex space-x-4">
              <Link href="/">
                <li className="text-white-800 hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </li>
              </Link>
              <Link href="/about">
                <li className="text-white-800 hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </li>
              </Link>
              <Link href="/blogs">
                <li className="text-white-800 hover:text-white-600 px-3 py-2 rounded-md text-sm font-medium">
                  Blogs
                </li>
              </Link>
            </div>
          </ul>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <ul>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <li className="text-white-800 hover:text-white-600 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </li>
            </Link>
            <Link href="/about">
              <li className="text-white-800 hover:text-white-600 block px-3 py-2 rounded-md text-base font-medium">
                About
              </li>
            </Link>
            <Link href="/blogs">
              <li className="text-white-800 hover:text-white-600 block px-3 py-2 rounded-md text-base font-medium">
                Blogs
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
};
