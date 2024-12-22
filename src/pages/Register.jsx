import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

export default function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const photo = formData.get("photo");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one Uppercase letter",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one Lowercase letter",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least one six characters",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    createUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Your register successful",
          showConfirmButton: false,
          timer: 1500,
        });
        updateUserProfile({
          displayName: name,
          photoURL: photo,
        });
        navigate("/login");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter your valid email!",
          footer: '<a href="#">Why do I have this issue?</a>',
        })
      );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className=" px-4 flex justify-center items-center py-6 md-py-8 lg:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Register now!
          </h1>
        </div>
        <div className="card bg-base-100 shadow-2xl rounded-lg p-8">
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label mb-2 text-sm text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label mb-2 text-sm text-gray-700">Photo</label>
              <input
                type="text"
                placeholder="Phot url"
                name="photo"
                className="input input-bordered w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label mb-2 text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
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
                className="input input-bordered w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-primary w-full py-3  rounded-lg text-white font-semibold hover:bg-red-700">
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Allready Have An Account ?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
