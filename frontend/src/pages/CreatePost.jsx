import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePost(){

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const API = import.meta.env.VITE_API_URL;
   

    const createNewPost = async (e) => {
        e.preventDefault();

        if (!files || files.length === 0) {
          alert("Please upload a file.");
          return;
        }

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);

        const response = await fetch(`${API}/post`, {
          method: "POST",
          body: data,
          credentials: "include",
        });
        if (response.ok) {
          setRedirect(true);
        }
    }

    if (redirect) {
      return <Navigate to={"/"} />;
    }


    return (
      <div className="w-[320px] p-3 md:w-5xl mx-auto md:p-6 shadow-xl rounded-xl mt-10 border border-gray-500">
        <h1 className="text-4xl font-bold mb-6 text-[#2c7cc2]  text-center">
          Create a New Post
        </h1>
        <form onSubmit={createNewPost} className="flex flex-col gap-6 p-2">
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-md focus:outline-none"
            required
          />
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-md  focus:outline-none"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-md text-gray-700 file:mr-4 file:py-3 file:px-4
            file:rounded-md file:border-0
            file:text-md file:font-semibold
            file:bg-blue-50 file:text-[#2c7cc2]
            hover:file:bg-blue-100"
          />
         
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-[150px] border border-gray-500 p-3 focus:outline-none rounded-md"
          ></textarea>
          <button
            type="submit"
            className="bg-[#2c7cc2] hover:bg-[#2c6cc2]  text-white  text-lg font-semibold px-6 py-3 rounded-md"
          >
           Publish Post
          </button>
        </form>
      </div>
    );
}