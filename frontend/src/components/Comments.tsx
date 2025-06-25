import { useEffect, useRef } from "react";
import { useComment } from "../context/CommentContext";
import Comment from "./Comment";

const Comments = ({ id }: { id: string | undefined }) => {
  const { comments, getBlogComments, addNewComment } = useComment();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (id) getBlogComments(id);
  }, []);

  const handleAddComment = () => {
    const comment = commentRef.current?.value;

    if (!comment) {
      return;
    }
    if (!id) return;

    addNewComment(id, comment);
  };

  return (
    <div className="flex flex-col my-20">
      <hr />
      <h2 className="text-gray-700 font-bold text-2xl my-5">Comments</h2>

      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <Comment
            comment={comment.comment}
            author={comment.authorId.username}
          />
        ))}
      </div>
      <div className="flex flex-col w-full my-10 gap-2">
        <textarea
          name="comment"
          id="comment"
          className="border rounded-md  p-2"
          placeholder="Your Comment..."
          ref={commentRef}
        />
        <button
          className="bg-blue-600 w-1/4 p-3 rounded-md text-white text-xl font-bold self-end"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
