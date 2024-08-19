"use client";
import { CardFullWidth, CardLarge, CardMedium } from "@/components/Cards";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/acceptedblogs");
        const data = await res.json();
        console.log(data);

        if (Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          console.error("Expected an array in data.data but got:", data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCards = () => {
    if (!blogs.length) {
      return <p>No blogs available.</p>;
    }

    if (!isMobile) {
      return (
        <>
          <div className="hidden md:flex justify-center gap-5 mb-10">
            {blogs[0] && <CardLarge blog={blogs[0]} />}
            <div className="flex flex-col gap-5">
              {blogs.slice(1, 4).map((blog, index) => (
                <CardMedium key={index} blog={blog} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-5">
            {blogs.slice(4).map((blog, index) => (
              <CardFullWidth key={index + 4} blog={blog} />
            ))}
          </div>
        </>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center mb-5 space-y-5">
          {blogs.map((blog, index) => (
            <CardFullWidth key={index} blog={blog} />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="text-white py-10 text-center">
        <h1 className="text-7xl sm:text-[8rem] md:text-[9rem] lg:text-[12rem] font-bold uppercase">
          The Blog
        </h1>
        {loading ? <p>Loading...</p> : renderCards()}
      </div>
    </div>
  );
};

export default Home;
