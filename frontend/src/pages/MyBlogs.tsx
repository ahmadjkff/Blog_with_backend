import { useEffect } from "react";
import Card from "../components/Card";
import { useBlog } from "../context/BlogContext";

const MyBlogs = () => {
  const { fetchMyBlogs, myBlogs, error } = useBlog();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 my-10 justify-center sm:flex-col sm:items-center md:flex-row ">
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <Card
            key={blog._id}
            id={blog._id}
            title={blog.title}
            category={blog.category}
            blogImg={blog.img}
            createdAt={new Date(blog.createdAt).toLocaleDateString()}
            authorName={blog.authorId.username}
          />
        ))
      ) : (
        <>No Blogs: {error}</>
      )}
    </div>
  );
};

export default MyBlogs;
