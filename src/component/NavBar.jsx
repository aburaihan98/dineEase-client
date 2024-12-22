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

  return (
    <div className="bg-primary">
      <div className="navbar shadow-sm w-11/12 m-auto">
        <div className="flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-7" alt="" />
            <span className="font-bold text-2xl">DineEase</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className="justify-between">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-foods">All Foods</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">Gallery</NavLink>
            </li>
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
          <div className="mr-2 flex justify-center items-center">
            <ThemeToggle />
          </div>
          {user && (
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
                className="bg-primary menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
              >
                <li>
                  <NavLink to="/my-foods">My Foods</NavLink>
                </li>
                <li>
                  <NavLink to="/add-food">Add food</NavLink>
                </li>
                <li>
                  <NavLink to="/my-orders">My Orders</NavLink>
                </li>
                <li className="mt-2">
                  <button onClick={handleLogout} className=" block text-center">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
