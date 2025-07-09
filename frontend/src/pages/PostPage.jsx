import { useContext, useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  function deletePost() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:4000/post/${postInfo._id}`, {
      method: "DELETE",
      credentials: "include", 
    }).then((res) => {
      if (res.ok) {
        alert("Post deleted successfully");
        window.location.href = "/"; 
      }
    });
  }
  

  if (!postInfo)
    return <div className="text-center  mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl  font-bold text-gray-600 mb-3">
        {postInfo.title}
      </h1>
      <div className="text-xl mb-4 md:flex items-center justify-between">
        <span className="flex gap-3">
          <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          <span className="font-medium text-[#2c7cc2] ">
            by @{postInfo.author.username}
          </span>
        </span>

        {userInfo.id === postInfo.author._id && (
          <div className="flex gap-3 mt-4">
            <Link
              className="inline-flex items-center gap-2 text-md px-5 py-2 border border-[#2c7cc2]  text-[#2c7cc2]  rounded-lg hover:bg-[#2c7cc2]  hover:text-white transition duration-800 "
              to={`/edit/${postInfo._id}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit
            </Link>
            <button 
            onClick={deletePost}
            className="inline-flex items-center gap-2 text-md px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7.5V19.5A2.25 2.25 0 008.25 21.75h7.5A2.25 2.25 0 0018 19.5V7.5M4.5 7.5h15M10.5 11.25v6M13.5 11.25v6M9.75 4.5h4.5A1.5 1.5 0 0115.75 6v1.5h-7.5V6A1.5 1.5 0 019.75 4.5z"
                />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl overflow-hidden shadow-xl">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt="Post cover"
          className="w-full h-[300px]"
        />
        <div
          className="prose max-w-none p-3 text-gray-800 text-xl leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>
      </div>
    </div>
  );
}
