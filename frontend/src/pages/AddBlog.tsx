import { useRef, useState } from "react";
import { useBlog } from "../context/BlogContext";
import { useNavigate } from "react-router";
import Dropdown from "../components/Dropdown";
import { CATEGORY_OPTIONS } from "../constants/dropdownOptions";

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>();
  const { addBlog, error: contextError } = useBlog();
  const navigate = useNavigate();

  const handleAddBlog = async (
    e: React.MouseEvent<HTMLButtonElement> | Event
  ) => {
    if (e) e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const img = imgRef.current?.value;

    if (!title || !content || !img || !category) {
      setError("All fields are required");
      return;
    }

    setError(null);

    const success = await addBlog(title, content, category, img);

    if (success) {
      alert("Blog added successfully");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleCategory = (option: { label: string; value: string }) => {
    setCategory(option.value);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-4 w-full xs:px-4 md:px-0">
      <h4 className="font-bold">Add Blog</h4>
      <form className="flex flex-col border border-black p-4 justify-center items-center gap-2 xs:w-full  md:w-1/4">
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
        <Dropdown
          options={CATEGORY_OPTIONS}
          placeholder="Category"
          onSelect={handleCategory}
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
          type="submit"
        >
          Add Blog
        </button>
        {error && <span className="font-semibold text-red-600">{error}</span>}
        {contextError && (
          <span className="font-semibold text-red-600">{contextError}</span>
        )}
      </form>
    </div>
  );
};

export default AddBlog;
