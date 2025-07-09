import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  
  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 
    });
    

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
   
  }

 
  if(redirect){
    return <Navigate to={"/"} />
  }
  return (
    <form
      className="w-[320px] md:w-md mx-auto mt-10 p-6 border border-[#2c7cc2] rounded-2xl shadow-xl  space-y-4"
      onSubmit={login}
    >
      <h1 className="text-3xl font-bold text-center text-[#2c7cc2]">Login</h1>
      <label className="block text-lg  mb-1" htmlFor="username">
        Username
      </label>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-md focus:outline-none "
      />
      <label className="block mb-1 text-lg" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-md focus:outline-none "
      />
      <button
        type="submit"
        className="w-full bg-[#2c7cc2] text-xl font-medium hover:bg-[#2c5cc2] text-white py-3 rounded-md"
      >
        Login
      </button>
    </form>
  );
}
