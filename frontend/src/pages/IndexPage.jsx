import Post from "../components/Post";
import { useEffect,useState } from "react";


const IndexPage = () => {
    const [posts,setPosts] = useState([]);
    const API = import.meta.env.VITE_API_URL;
  
  
    
    
    useEffect(() => {
      fetch(`${API}/post`).then(response => {
        response.json().then(posts => {
          setPosts(posts);
        })
      })
    },[])
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl mb-6 font-bold">Recent Posts . . .</h1>

      {posts.length === 0 && (
        <p className="text-center text-gray-600 text-xl">No posts available.</p>
      )}

      <div className="">
        {posts.length > 0 &&
          posts.map((post) => <Post key={post._id} {...post} />)}
      </div>
    </main>
  );
}

export default IndexPage