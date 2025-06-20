import { useRef, useState } from "react";
import { useBlog } from "../context/BlogContext";
import { useNavigate } from "react-router";

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>();
  const { addBlog } = useBlog();
  const navigate = useNavigate();

  const handleAddBlog = async () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const category = categoryRef.current?.value;
    const img = imgRef.current?.value;

    if (!title || !content || !img || !category) {
      setError("All fields are required");
      return;
    }

    setError(null);
    addBlog(title, content, img, category);
    alert("Blog added successfully");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-4 w-full">
      <h4 className="font-bold">Add Blog</h4>
      <div className="flex flex-col border border-black p-4 justify-center items-center gap-2 w-1/4">
        <input
          type="text"
          className="border border-black p-3 rounded-md w-full"
          placeholder="Title"
          ref={titleRef}
        />
        <textarea
          className="border border-black p-3 rounded-md w-full"
          placeholder="Content"
          ref={contentRef}
        />
        <input
          type="text"
          className="border border-black p-3 rounded-md w-full"
          placeholder="Category"
          ref={categoryRef}
        />
        <input
          type="text"
          className="border border-black p-3 rounded-md w-full"
          placeholder="Image"
          ref={imgRef}
        />
        <button
          className="bg-blue-600 w-full p-2 rounded-md text-white mt-2 cursor-pointer"
          onClick={handleAddBlog}
        >
          Add Blog
        </button>
        {error && <span className="font-semibold text-red-600">{error}</span>}
      </div>
    </div>
  );
};

export default AddBlog;
