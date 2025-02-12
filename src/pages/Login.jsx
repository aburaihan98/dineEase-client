import React, { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { AuthContext } from "../provider/AuthProvider";

export default function Login() {
  const { signInUser, loginWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // email password  login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    signInUser(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/");
        Swal.fire({
          icon: "success",
          title: "Your login successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email or password is incorrect!",
          footer: '<a href="#">Why do I have this issue?</a>',
        })
      );
  };

  // google login
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        navigate(location.state ? location.state : "/");
        toast.success(" Your login successful by Google");
      })
      .catch(() => {
        toast.error("Enter your valid email");
      });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-5 md:py-10 bg-primary font-semibold">
      <div className="px-4 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-4 lg:mb-8">
            <h1 className="text-2xl font-bold text-secondary">Login now!</h1>
          </div>
          <div className="card bg-base-100 shadow-2xl rounded-lg p-8">
            <form onSubmit={handleLoginSubmit} className="">
              <div className="form-control">
                <label className="label mb-2 text-sm text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2 text-sm text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full p-3  text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-secondary w-full py-3 rounded-lg text-white font-semibold hover:bg-secondary hover:text-white">
                  Login
                </button>
              </div>
            </form>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-secondary text-white w-full  mt-4 border border-primaryColor rounded-md flex items-center justify-center gap-2 text-primaryColor font-semibold text-xl mb-2 hover:bg-secondary hover:text-white"
            >
              <FaGoogle />
              Login with Google
            </button>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-secondary font-semibold">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
