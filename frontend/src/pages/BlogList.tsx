import { useEffect } from "react";
import Card from "../components/Card";
import { useBlog } from "../context/BlogContext";
import Dropdown from "../components/Dropdown";
import { CATEGORY_OPTIONS } from "../constants/dropdownOptions";

const BlogList = () => {
  const { fetchblogs, blogs, error } = useBlog();

  useEffect(() => {
    fetchblogs();
  }, [blogs]);

  return (
    <div className="flex flex-col gap-10 my-10 px-24">
      <div className="flex justify-end ">
        <Dropdown
          placeholder="Category"
          options={CATEGORY_OPTIONS}
          styles="w-48"
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center sm:flex-col sm:items-center md:flex-row ">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
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
    </div>
  );
};

export default BlogList;
