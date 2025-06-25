const Comment = ({ comment, author }: { comment: string; author: string }) => {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <img
          src="https://i.pravatar.cc/40"
          className="bg-black rounded-full size-8"
        />
        <span className="font-semibold">{author}</span>
      </div>
      <p className="ml-10">{comment}</p>
    </div>
  );
};

export default Comment;
