import { Link, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useUser } from "../context/userContext";

interface ICardProps {
  title: string;
  category: string;
  blogImg?: string;
  createdAt: string;
  id: string;
  authorName: string;
}

function Card({
  title,
  category,
  blogImg,
  createdAt,
  id,
  authorName,
}: ICardProps) {
  const { isAdmin } = useUser();
  const { deleteBlog, fetchBlog } = useBlog();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    deleteBlog(id);
  };

  const handleEdit = async (id: string) => {
    const success = await fetchBlog(id);
    if (success) {
      navigate(`/edit/${id}`);
    }
  };

  return (
    <Link
      to={`/blog/${id}`}
      className="flex flex-col w-[320px] p-5 border rounded-md hover:bg-gray-50 transition duration-200"
    >
      <img src={blogImg} alt="placeholder" />
      <p className="bg-blue-50 w-full max-w-24 rounded-sm text-blue-500 my-5 p-1 text-center">
        {category || "-----"}
      </p>
      <h2 className="font-bold text-start">{title}</h2>
      <div className="flex justify-between items-center mt-4">
        <div className="flex  gap-2 items-center">
          <img
            className="rounded-full w-9 h-9"
            src="https://i.pravatar.cc/40"
            alt="placeholder"
          />
          <p className="mt-1">{authorName}</p>
        </div>
        <p>{createdAt}</p>
        <div className="flex flex-col gap-1/2">
          {isAdmin && (
            <button
              className="text-red-500 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(id);
              }}
            >
              Delete
            </button>
          )}
          {isAdmin && (
            <button
              className="text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEdit(id);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
