import { useEffect, useRef } from "react";
import { useBlog } from "../context/BlogContext";
import { useNavigate } from "react-router";

const EditBlog = () => {
  const { blog, editBlog } = useBlog();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement> | Event) => {
    if (e) e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const category = categoryRef.current?.value;
    const img = imgRef.current?.value;

    if (!title || !content || !img || !category) {
      return;
    }

    if (blog) editBlog(blog?._id, title, content, category, img);

    navigate(`/`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-4 w-full xs:px-4 md:px-0">
      <h4 className="font-bold text-2xl">Edit Blog</h4>
      <form className="flex flex-col border border-black p-4 justify-center items-center gap-2 xs:w-full md:w-1/4">
        <input
          className="border border-black p-3 rounded-md w-full"
          type="text"
          placeholder="Title"
          defaultValue={blog?.title}
          ref={titleRef}
        />
        <textarea
          name="content"
          id="content"
          className="border border-black p-3 rounded-md w-full"
          placeholder="Content"
          defaultValue={blog?.content}
          ref={contentRef}
        ></textarea>

        <input
          className="border border-black p-3 rounded-md w-full"
          type="text"
          placeholder="Category"
          defaultValue={blog?.category}
          ref={categoryRef}
        />
        <input
          className="border border-black p-3 rounded-md w-full"
          type="text"
          placeholder="Image"
          defaultValue={blog?.img}
          ref={imgRef}
        />
        <button
          className="bg-blue-600 w-full p-2 rounded-md text-white mt-2 cursor-pointer"
          onClick={handleEdit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
