import { useEffect } from "react";
import blogImage from "../assets/blogImage.png";
import blogImage2 from "../assets/blogImage2.png";
import { useBlog } from "../context/BlogContext";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

const BlogDetails = () => {
  const { blog, fetchBlog } = useBlog();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchBlog(id);
  }, []);

  if (!blog) return <>Cannot find blog</>;

  return (
    <div className="flex justify-center my-10">
      <div className="card-content w-[800px] flex flex-col justify-center align-middle mx-0 my-auto">
        <p className="bg-blue-500 text-white max-w-32 rounded-md h-8 flex items-center justify-center">
          {blog.category}
        </p>
        <h1 className="font-bold text-start mt-4 text-2xl">{blog.title}</h1>
        <div className="flex gap-3 mt-3 align-middle">
          <img
            src="https://i.pravatar.cc/40"
            alt="author image"
            className="rounded-full h-6 w-6 "
          />
          <p>{blog.authorId.username}</p>
          <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex justify-center mt-4">
          <img
            className="w-full max-h-[462px]"
            src={blogImage}
            alt="blog image"
          />
        </div>
        <div className="text-start mt-4 flex flex-col gap-5">
          <p className="mt-4 text-gray-600">{blog.content}</p>
          <p className="mt-4 text-gray-600">{blog.content}</p>

          <h2 className="font-bold text-xl mt-8">Research Your Destination</h2>
          <p className="flex flex-col gap-8">{blog.content} </p>
          <p className="flex flex-col gap-8">{blog.content} </p>

          <h2 className="font-bold text-xl mt-8">Plan Your Itinerary</h2>
          <p className="flex flex-col gap-8">{blog.content} </p>
          <p className="flex flex-col gap-8">{blog.content} </p>
        </div>

        <div className="shadow-md bg-gray-100 mt-5 p-5 font-playFair text-lg">
          " Traveling can expose you to new environments and potential health
          risks, so it's crucial to take precautions to stay safe and healthy."
        </div>

        <div className="flex justify-center mt-10">
          <img
            className="w-full max-h-[462px]"
            src={blogImage2}
            alt="blog image"
          />
        </div>

        <div className="flex flex-col bg-gray-100 shadow-md p-5 mt-10 text-gray-500">
          <p>Advertisement</p>
          <h3 className="font-bold">You can place ads</h3>
          750 x 100
        </div>

        <div className="text-start mt-10">
          <h2 className="font-bold text-xl mt-8">Pack Lightly and Smartly</h2>
          <p className="mt-4 text-gray-600">{blog.content}</p>

          <h2 className="font-bold text-xl mt-8">Stay Safe and Healthy</h2>
          <p className="mt-4 text-gray-600">{blog.content}</p>

          <h2 className="font-bold text-xl mt-8">
            Immerse Yourself in the Local Culture
          </h2>
          <p className="mt-4 text-gray-600">{blog.content}</p>

          <h2 className="font-bold text-xl mt-8">Capture Memories</h2>
          <p className="mt-4 text-gray-600">{blog.content}</p>

          <h2 className="font-bold text-xl mt-8">Conclusion:</h2>
          <p className="mt-4 text-gray-600">{blog.content}</p>
        </div>
        <Comments id={id} />
      </div>
    </div>
  );
};

export default BlogDetails;
