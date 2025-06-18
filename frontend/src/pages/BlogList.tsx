import { useEffect } from "react";
import Card from "../components/Card";
import { useBlog } from "../context/BlogContext";

const BlogList = () => {
  const { fetchblogs, blogs } = useBlog();

  useEffect(() => {
    fetchblogs();
  }, [blogs.length]);

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

export default BlogList;
