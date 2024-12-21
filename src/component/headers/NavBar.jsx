import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../../provider/AuthProvider";
// import ThemeToggle from "../hemeToggle/ThemeToggle";

export default function NavBar() {
  const { user, userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.warning("Your logout successful");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="bg-[#007BFF]">
      <div className="w-11/12 m-auto navbar px-0 py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" bg-primary space-y-1 font-medium text-lg text-[#706F6F] menu menu-sm dropdown-content  rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "btn bg-white" : "btn bg-primary text-white"
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/all-sports-equipment"
                className={({ isActive }) =>
                  isActive ? "btn bg-white" : "btn bg-primary text-white"
                }
              >
                <li>All Sports Equipment</li>
              </NavLink>
              <NavLink
                to="/add-equipment"
                className={({ isActive }) =>
                  isActive ? "btn bg-white" : "btn bg-primary text-white"
                }
              >
                <li>Add Equipment</li>
              </NavLink>
              <NavLink
                to="/my-equipment-list"
                className={({ isActive }) =>
                  isActive ? "btn bg-white" : "btn bg-primary text-white"
                }
              >
                <li>My Equipment List</li>
              </NavLink>
            </ul>
          </div>
          <Link to="/">
            <button className="font-bold lg:text-3xl text-white">
              <h2>
                <p>
                  <Fade cascade>EquiSports</Fade>
                </p>
              </h2>
            </button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="space-x-4 menu menu-horizontal px-1 font-semibold text-lg text-[#706F6F]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "btn bg-white" : "btn bg-primary text-white"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/all-sports-equipment"
              className={({ isActive }) =>
                isActive ? "btn bg-white" : "btn bg-primary text-white"
              }
            >
              <li>All Sports Equipment</li>
            </NavLink>
            <NavLink
              to="/add-equipment"
              className={({ isActive }) =>
                isActive ? "btn bg-white" : "btn bg-primary text-white"
              }
            >
              <li>Add Equipment</li>
            </NavLink>
            <NavLink
              to="/my-equipment-list"
              className={({ isActive }) =>
                isActive ? "btn bg-white" : "btn bg-primary text-white"
              }
            >
              <li>My Equipment List</li>
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="mr-2 flex justify-center items-center">
            {/* <ThemeToggle /> */}
          </div>
          {user ? (
            <>
              <div className="w-12 h-12">
                <img
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user?.displayName}
                  className="w-full h-full rounded-full cursor-pointer"
                  src={user?.photoURL ? user?.photoURL : ""}
                  alt={user?.displayName}
                />
                <Tooltip id="my-tooltip" place="left" />
              </div>
              <button
                onClick={handleLogout}
                className="btn bg-primary text-white hover:bg-white hover:text-secondary ml-2.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "btn bg-white mr-2"
                    : "btn bg-primary text-white mr-2"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "btn bg-white" : "btn bg-primary text-white"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
