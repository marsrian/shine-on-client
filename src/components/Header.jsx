import { Link } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Logo from "../assets/Category/Gold-4.png";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="flex justify-between items-center text-white px-2 md:px-8 border-b-2 border-b-gray-200">
      <div className="flex items-center">
        <img className="h-10 w-10" src={Logo} alt="" />
        <h1 className="text-xl font-semibold italic text-gray-800">Shine On</h1>
      </div>
      <div className={`menu flex items-center ${menuOpen ? "open" : ""}`}>
        <div className="block md:hidden my-3 z-30" onClick={toggleMenu}>
          X
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <ul
            className={`flex flex-col md:flex-row z-30 ${
              menuOpen ? "open" : ""
            }`}
          >
            <li className="hover:text-purple-400 font-medium">
              <ActiveLink to="/">Home</ActiveLink>
            </li>
            <li className="hover:text-purple-400 font-medium">
              <ActiveLink to="/all-jewelry">All Jewelry</ActiveLink>
            </li>
            <li className="hover:text-purple-400 font-medium">
              <ActiveLink to="/blogs">Blogs</ActiveLink>
            </li>
            {user && (
              <li className="hover:text-purple-400 font-medium">
                <ActiveLink
                  to={
                    isAdmin
                      ? "/dashboard/manage-users"
                      : "/dashboard/my-jewelry"
                  }
                  className="text-gray-600"
                >
                  DashBoard
                </ActiveLink>
              </li>
            )}
          </ul>
          <div>
            {user ? (
              <div className="flex gap-4">
                <button
                  onClick={handleLogOut}
                  className="font-medium px-3 py-0 text-gray-800 hover:bg-[#2cdbde] rounded-lg"
                >
                  Log Out
                </button>
                <img
                  title={user?.displayName}
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
            ) : (
              <>
                <Link
                  className="text-[#2cdbde] px-3 py-2 bg-transparent border-2 border-[#2cdbde] rounded-lg text-lg font-bold hover:bg-[#2cdbde] hover:text-white mr-2"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`block md:hidden text-gray-800 ${menuOpen ? "hidden" : ""}`}
        onClick={toggleMenu}
      >
        &#9776;
      </div>
    </div>
  );
};

export default Header;
