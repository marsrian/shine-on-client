import { Link } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Logo from "../assets/Category/Gold-4.png";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-between items-center h-20 my-auto bg-white px-4 md:px-8">
      <div className="flex items-center">
        <img className="h-10 w-10" src={Logo} alt="" />
        <h1 className="text-xl font-semibold italic text-gray-800">
          Shine On
        </h1>
      </div>
      <div className="flex gap-8 items-center">
        <ul className="hidden md:flex gap-6">
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
                  isAdmin ? "/dashboard/manage-users" : "/dashboard/my-jewelry"
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
                className="font-medium px-3 py-0 hover:bg-[#2cdbde] rounded-lg"
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
  );
};

export default Header;
