import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="w-[320px] p-3 md:w-5xl mx-auto md:p-6 bg-white shadow-xl rounded-xl mt-8 border border-gray-500">
      <h1 className="text-4xl font-bold mb-6 text-[#2c7cc2] text-center">
        Edit Post
      </h1>
      <form onSubmit={updatePost} className="flex flex-col gap-6 p-2">
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

        {/* <Editor onChange={setContent} value={content} /> */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-[160px] border border-gray-500 p-3 focus:outline-none rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-[#2c7cc2] hover:bg-[#2c5cc2] text-lg text-white font-semibold px-6 py-3 rounded-md"
        >
          Edit Post
        </button>
      </form>
    </div>
  );
}
