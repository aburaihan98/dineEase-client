import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading";
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
    return <Loading />;
  }

  return (
    <section className="py-5 md:py-10 bg-primary font-semibold">
      <div className="px-4 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-secondary mb-4">
              Register now!
            </h1>
          </div>
          <div className="card bg-base-100 shadow-2xl rounded-lg p-8">
            <form onSubmit={handleRegisterSubmit} className="">
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
                <label className="label mb-2 text-sm text-gray-700">
                  Photo
                </label>
                <input
                  type="text"
                  placeholder="Phot url"
                  name="photo"
                  className="input input-bordered w-full p-3 text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label mb-2 text-sm text-gray-700">
                  Email
                </label>
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
                <button className="btn bg-secondary w-full py-3  rounded-lg text-white font-semibold hover:bg-secondary hover:text-white">
                  Login
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Allready Have An Account ?{" "}
                <Link to="/login" className="text-secondary font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
