import { useState } from "react";
import { Navigate } from "react-router-dom";


const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function SignUp(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({ fullName, username, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);
    if (response.status === 200) {
      setRedirect(true);
      alert("Signup successful");
    } else {
      alert("Signup failed");
    }
  }

   
    if(redirect){
      return <Navigate to={"/"} />
    }


  return (
    <form
      className="w-[320px] md:w-md mx-auto mt-10 p-6 border border-[#2c7cc2] rounded-xl shadow-xl space-y-4"
      onSubmit={SignUp}
    >
      <h1 className="text-3xl font-bold text-center text-[#2c7cc2]">Sign Up</h1>

      <label className="block text-lg mb-1" htmlFor="fullname">
        Full Name
      </label>
      <input
        type="text"
        placeholder="Your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-md focus:outline-none"
      />

      <label className="block text-lg mb-1" htmlFor="username">
        Username
      </label>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-md focus:outline-none"
      />

      <label className="block mb-1 text-lg" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-3 border rounded-md focus:outline-none"
      />

      <button
        type="submit"
        className="w-full text-xl font-medium bg-[#2c7cc2] hover:bg-[#2c5cc2] text-white py-3 rounded-md"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupPage;
