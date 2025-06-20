import { useEffect, useState } from "react";
import Card from "../components/Card";
import type { Blog } from "../context/BlogContext";
import { useUser } from "../context/userContext";

const MyBlogs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useUser();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${API_URL}/blog/my-blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 my-10 justify-center sm:flex-col sm:items-center md:flex-row ">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card
            key={blog._id}
            id={blog._id}
            title={blog.title}
            blogImg={blog.img}
            createdAt={new Date(blog.createdAt).toLocaleDateString()}
            authorName={blog.authorId.username}
          />
        ))
      ) : (
        <>No Blogs</>
      )}
    </div>
  );
};

export default MyBlogs;
