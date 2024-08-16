import React from 'react';

export const CardLarge = ({ blogTitle, authorName, blogContent }) => {
  return (
    <div className="w-full md:w-[45vw] h-[80vh] bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold">{blogTitle}</h2>
      <p className="text-xl mt-2">by {authorName}</p>
      <p className="mt-4 text-lg">{blogContent}</p>
    </div>
  );
};

export const CardMedium = ({ blogTitle, authorName, blogContent }) => {
  return (
    <div className="w-full md:w-[45vw] h-[25vh] bg-gray-700 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold">{blogTitle}</h2>
      <p className="text-lg mt-2">by {authorName}</p>
      <p className="mt-4 text-md">{blogContent}</p>
    </div>
  );
};

export const CardFullWidth = ({ blogTitle, authorName, blogContent }) => {
  return (
    <div className="w-[95vw] h-[30vh] bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold">{blogTitle}</h2>
      <p className="text-lg mt-2">by {authorName}</p>
      <p className="mt-4 text-md">{blogContent}</p>
    </div>
  );
};
