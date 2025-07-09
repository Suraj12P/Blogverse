import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) 


{

  const API = import.meta.env.VITE_API_URL;
  fetch(`${API}/post`);

  return (
    <div className="mb-8 m-1 rounded-xl overflow-hidden shadow-2xl">
      <Link to={`/post/${_id}`}>
        <img
          src={`${API}` + cover}
          alt="image"
          className="w-full h-[300px] md:h-[450px]"
        />
      </Link>

      <div className="p-3">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-bold  text-[#2c7cc2]">{title}</h2>
        </Link>

        <div className="text-lg text-gray-500 mt-1 mb-4 flex items-center space-x-2">
          <span className="font-medium text-gray-700">@{author.username}</span>

          <span>•</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
