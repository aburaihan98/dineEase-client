import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";

import { AuthContext } from "../provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const { user, userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.warning("Your logout successful");
      })
      .catch((error) => toast.error(error.message));
  };

  let a = true;
  if (a) {
    return <Loading />;
  }

  return (
    <div className="sticky top-0 z-50 py-2 bg-primary text-secondary font-semibold text-[15px]">
      <div className="navbar px-0 w-11/12 m-auto">
        <div className="navbar-start">
          {/* Dropdown for Mobile */}
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
              className="bg-primary menu menu-sm dropdown-content mt-3 w-52 rounded-box p-2 shadow z-[1]"
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " pb-1 border-b-2 border-yellow-color" : ""
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " pb-1 border-b-2 border-yellow-color" : ""
                  }
                  to="/all-foods"
                >
                  All Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " pb-1 border-b-2 border-yellow-color" : ""
                  }
                  to="/gallery"
                >
                  Gallery
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? " pb-1 border-b-2 border-yellow-color" : ""
                      }
                      to="/my-foods"
                    >
                      My Foods
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? " pb-1 border-b-2 border-yellow-color" : ""
                      }
                      to="/add-food"
                    >
                      Add Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? " pb-1 border-b-2 border-yellow-color" : ""
                      }
                      to="/my-orders"
                    >
                      My Orders
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Logo */}
          <Link to="/" className="text-xl flex gap-2 items-center">
            <span className="font-bold text-2xl">DineEase</span>
          </Link>
        </div>
        {/* Navbar Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-4 px-1">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-color pb-1 border-b-2 border-yellow-color"
                    : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-color pb-1 border-b-2 border-yellow-color"
                    : ""
                }
                to="/all-foods"
              >
                All Foods
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-color pb-1 border-b-2 border-yellow-color"
                    : ""
                }
                to="/gallery"
              >
                Gallery
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-color pb-1 border-b-2 border-yellow-color"
                        : ""
                    }
                    to="/my-foods"
                  >
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-color pb-1 border-b-2 border-yellow-color"
                        : ""
                    }
                    to="/add-food"
                  >
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-color pb-1 border-b-2 border-yellow-color"
                        : ""
                    }
                    to="/my-orders"
                  >
                    My Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* End Section */}
        <div className="navbar-end flex items-center">
          <div className="mr-2">
            <ThemeToggle />
          </div>
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-[#3f444b] text-white p-2 shadow z-[1]"
              >
                <li className="">
                  <button onClick={handleLogout} className="block text-center">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-secondary text-white font-semibold hover:bg-secondary hover:text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
