"use client"
import React from 'react';
import Link from 'next/link';

export const CardLarge = ({ blog }) => {

  return (
    <div className="w-full md:w-[45vw] h-[80vh] bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <Link href={`/getblog/${blog.id}`}><h2 className="text-4xl font-bold">{blog.title}</h2></Link>
      <p className="text-xl mt-2">by {blog.author}</p>
      <p className="mt-4 text-lg">{blog.content}</p>
    </div>
  );
};

export const CardMedium = ({ blog }) => {
  return (
    <div className="w-full md:w-[45vw] h-[25vh] bg-gray-700 text-white p-6 rounded-lg shadow-lg">
      <Link href={`/getblog/${blog.id}`}><h2 className="text-4xl font-bold">{blog.title}</h2></Link>
      <p className="text-lg mt-2">by {blog.author}</p>
      <p className="mt-4 text-md">{blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}</p>
    </div>
  );
};

export const CardFullWidth = ({ blog }) => {
  return (
    <div className="w-[95vw] h-[30vh] bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <Link href={`/getblog/${blog.id}`}><h2 className="text-4xl font-bold">{blog.title}</h2></Link>
      <p className="text-lg mt-2">by {blog.author}</p>
      <p className="mt-4 text-md">{blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}</p>
    </div>
  );
};
