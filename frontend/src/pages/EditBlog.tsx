import { useRef, useState } from "react";
import { useBlog } from "../context/BlogContext";
import { useNavigate } from "react-router";
import Dropdown from "../components/Dropdown";
import { CATEGORY_OPTIONS } from "../constants/dropdownOptions";

const EditBlog = () => {
  const { blog, editBlog, error: contextError } = useBlog();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [category, setCategory] = useState<string | undefined>(blog?.category);
  const imgRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement> | Event) => {
    if (e) e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const img = imgRef.current?.value;

    if (!title || !content || !img || !category) {
      setError("all fields are required");
      return;
    }

    if (!blog) {
      setError("Blog Not Found");
      return;
    }

    setError(null);

    const success = await editBlog(blog?._id, title, content, category, img);

    if (success) navigate(`/`);
  };

  const handleCategory = (option: { label: string; value: string }) => {
    setCategory(option.value);
    console.log(option.value);
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

        <Dropdown
          options={CATEGORY_OPTIONS}
          placeholder={blog?.category}
          onSelect={handleCategory}
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
        {error && <span className="font-semibold text-red-600">{error}</span>}
        {contextError && (
          <span className="font-semibold text-red-600">{contextError}</span>
        )}
      </form>
    </div>
  );
};

export default EditBlog;
