import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const API = import.meta.env.VITE_API_URL;
 


  useEffect(() => {
    fetch(`${API}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    setMenuOpen(false);
  }

  const username = userInfo?.username;

  return (
    <div className="md:m-4 m-2  rounded-2xl bg-amber-100">
      <header className=" md:m-4 m-2  py-4 px-5 md:px-12 flex items-center justify-between relative">
        <Link
          to="/"
          className="text-3xl font-bold text-[#2c7cc2] hover:text-black"
        >
          Blogverse
        </Link>

        <nav className="hidden md:flex gap-8">
          {username ? (
            <>
              <Link
                to="/create"
                className="text-gray-500 text-xl hover:text-[#2c7cc2] font-medium"
              >
                Create new post
              </Link>
              <button
                onClick={logout}
                className="text-gray-500 text-xl hover:text-[#2c7cc2] font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 text-xl hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 text-xl hover:text-blue-600 font-medium"
              >
                Signup
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden ">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#2c7cc2] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="w-10 h-10 "
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="w-full  text-xl md:hidden mt-2 bg-amber-100 shadow-md rounded-xl pb-6 flex flex-col items-center  gap-3 transition-all duration-1000 ease-in-out">
          {username ? (
            <>
              <Link
                to="/create"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-[#2c7cc2] font-medium "
              >
                Create new post
              </Link>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-[#2c7cc2] font-medium text-left"
              >
                Logout ({username})
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Signup
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
