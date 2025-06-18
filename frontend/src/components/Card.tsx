import { useBlog } from "../context/BlogContext";
import { useUser } from "../context/userContext";

interface ICardProps {
  title: string;
  blogImg?: string;
  createdAt: string;
  id: string;
  authorName: string;
}

function Card({ title, blogImg, createdAt, id, authorName }: ICardProps) {
  const { isAdmin, token } = useUser();
  const { setBlogs, blogs } = useBlog();

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3222/blog/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const otherblogs = blogs.filter((b) => b._id !== id);
    setBlogs(otherblogs);

    if (!response.ok) return;
  };

  return (
    <div className="flex flex-col w-[320px] p-5 border rounded-md hover:bg-gray-50 transition duration-200">
      <img src={blogImg} alt="placeholder" />
      <p className="bg-blue-50 w-full max-w-24 rounded-sm text-blue-500 my-5">
        category
      </p>
      <h2 className="font-bold text-start">{title}</h2>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <img
            className="rounded-full w-9 h-9"
            src="https://i.pravatar.cc/40"
            alt="placeholder"
          />
          <p className="mt-1">{authorName}</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p>{createdAt}</p>
          {isAdmin && (
            <button
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
