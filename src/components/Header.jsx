import { Link } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Logo from "../assets/Category/Gold-4.png";
import "./Header.css";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

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
    <div className="flex justify-between items-center text-white px-2 md:px-8 py-3 border-b-2 border-b-gray-200 bg-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <img className="h-10 w-10" src={Logo} alt="" />
        <h1 className="text-xl font-semibold italic text-white">
          Shine On
        </h1>
      </div>
      <div
        className={`menu flex md:flex-row md:gap-4 items-center ${
          menuOpen ? "open" : ""
        }`}
      >
        <div className="block md:hidden my-3 z-30" onClick={toggleMenu}>
          X
        </div>
        {/* Flowbite Dark Mode */}
        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div
            className={`flex flex-col md:flex-row z-30 gap-3 ${
              menuOpen ? "open" : ""
            }`}
          >
            <ActiveLink to="/">Home</ActiveLink>
            <ActiveLink to="/all-jewelry">All Jewelry</ActiveLink>
            {user && (
              <ActiveLink
                to={
                  isAdmin ? "/dashboard/manage-users" : "/dashboard/my-jewelry"
                }
                className="text-gray-600"
              >
                DashBoard
              </ActiveLink>
            )}
          </div>
          <div>
            {user ? (
              <div className="flex gap-4 items-center">
                <button
                  onClick={handleLogOut}
                  className="font-medium px-3 py-2 text-green-400 hover:bg-green-400 hover:text-white border border-green-400 rounded-sm dark:text-white"
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
                  className="text-green-400 px-3 py-2 bg-transparent border border-green-400 rounded-sm hover:bg-green-400 hover:text-white mr-2"
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
        className={`block md:hidden text-white ${
          menuOpen ? "hidden" : ""
        }`}
        onClick={toggleMenu}
      >
        &#9776;
      </div>
    </div>
  );
};

export default Header;
