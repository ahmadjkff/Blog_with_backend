interface ICardProps {
  title: string;
  blogImg?: string;
}

function Card({ title, blogImg }: ICardProps) {
  return (
    <div className="flex flex-col w-[320px] p-5 border rounded-md hover:bg-gray-50 transition duration-200">
      <img src={blogImg} alt="placeholder" />
      <p className="bg-blue-50 w-full max-w-24 rounded-sm text-blue-500 my-5">
        category
      </p>
      <h2 className="font-bold text-start">{title}</h2>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <img
            className="rounded-full w-9 h-9"
            src="https://i.pravatar.cc/40"
            alt="placeholder"
          />
          <p className="mt-1">Author</p>
        </div>
        <p>Date</p>
      </div>
    </div>
  );
}

export default Card;
