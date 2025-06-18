import { useRef } from "react";
import { useUser } from "../context/userContext";

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const { token } = useUser();

  const handleAddBlog = async () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    const response = await fetch("http://localhost:3222/blog/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
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
        <input
          type="text"
          className="border border-black p-3 rounded-md w-full"
          placeholder="Content"
          ref={contentRef}
        />
        <button
          className="bg-blue-600 w-full p-2 rounded-md text-white mt-2 cursor-pointer"
          onClick={handleAddBlog}
        >
          Add Blog
        </button>
        {/* {error && <span className="font-semibold text-red-600">{error}</span>}{" "} */}
      </div>
    </div>
  );
};

export default AddBlog;
