import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useUser } from "../context/userContext";

interface Blog {
  _id: string;
  title: string;
  content: string;
  img?: string | undefined;
  createdAt: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { token } = useUser();

  useEffect(() => {
    const fetchblogs = async () => {
      const response = await fetch(`http://localhost:3222/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;

      setBlogs(await response.json());
    };
    fetchblogs();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mt-32 justify-center sm:flex-col sm:items-center md:flex-row ">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card
            key={blog._id}
            title={blog.title}
            blogImg={blog.img}
            createdAt={new Date(blog.createdAt).toLocaleDateString()}
          />
        ))
      ) : (
        <>No Blogs</>
      )}
    </div>
  );
};

export default BlogList;
