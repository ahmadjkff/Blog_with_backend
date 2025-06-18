import { useEffect } from "react";
import Card from "../components/Card";
import { useBlog } from "../context/BlogContext";
import { useUser } from "../context/userContext";

const BlogList = () => {
  const { isAdmin } = useUser();
  const { fetchblogs, blogs } = useBlog();

  useEffect(() => {
    fetchblogs();
  }, [blogs.length]);

  console.log(isAdmin);

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
          />
        ))
      ) : (
        <>No Blogs</>
      )}
    </div>
  );
};

export default BlogList;
