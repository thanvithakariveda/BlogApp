import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  // REGISTER FUNCTION
  const onUserRegister = async (userObj) => {
    try {
      setLoading(true);
      setApiError(null);

      const formData = new FormData();

      formData.append("role", userObj.role);
      formData.append("firstName", userObj.firstName);
      formData.append("lastName", userObj.lastName || "");
      formData.append("email", userObj.email);
      formData.append("password", userObj.password);

      if (userObj.profileImageUrl?.[0]) {
        formData.append(
          "profileImageUrl",
          userObj.profileImageUrl[0]
        );
      }

      const BASE_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:4000";

      const res = await axios.post(
        `${BASE_URL}/auth/users`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration error:", err);

      setApiError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/20 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative w-full max-w-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center text-black text-2xl font-black shadow-lg shadow-cyan-500/20">
            M
          </div>

          <h2 className="text-4xl font-black text-white mt-5">
            Create Account
          </h2>

          <p className="text-zinc-400 mt-2">
            Join the modern blogging community
          </p>
        </div>

        {/* ERROR */}
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
            {apiError}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onUserRegister)}
          className="space-y-5"
        >

          {/* ROLE */}
          <div>
            <p className="text-sm text-zinc-300 mb-3">
              Register As
            </p>

            <div className="flex gap-4">

              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="USER"
                  className="hidden peer"
                  {...register("role", {
                    required: "Select role",
                  })}
                />

                <div className="border border-zinc-700 peer-checked:border-cyan-400 peer-checked:bg-cyan-400/10 rounded-2xl py-3 text-center text-zinc-300 transition">
                  User
                </div>
              </label>

              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  value="AUTHOR"
                  className="hidden peer"
                  {...register("role", {
                    required: "Select role",
                  })}
                />

                <div className="border border-zinc-700 peer-checked:border-fuchsia-400 peer-checked:bg-fuchsia-400/10 rounded-2xl py-3 text-center text-zinc-300 transition">
                  Author
                </div>
              </label>

            </div>

            {errors.role && (
              <p className="text-red-400 text-sm mt-2">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* NAME */}
          <div className="grid sm:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm text-zinc-300 mb-2">
                First Name
              </label>

              <input
                type="text"
                placeholder="John"
                className="w-full bg-black/40 border border-zinc-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-white px-4 py-3 rounded-2xl transition"
                {...register("firstName", {
                  required: "First name required",
                })}
              />

              {errors.firstName && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-2">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Doe"
                className="w-full bg-black/40 border border-zinc-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 outline-none text-white px-4 py-3 rounded-2xl transition"
                {...register("lastName")}
              />
            </div>

          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-black/40 border border-zinc-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-white px-4 py-3 rounded-2xl transition"
              {...register("email", {
                required: "Email required",
              })}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black/40 border border-zinc-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 outline-none text-white px-4 py-3 rounded-2xl transition"
              {...register("password", {
                required: "Password required",
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* PROFILE IMAGE */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/png, image/jpeg"
              className="w-full bg-black/40 border border-zinc-700 file:bg-cyan-400 file:border-0 file:px-4 file:py-2 file:rounded-xl file:text-black file:font-semibold text-zinc-400 px-4 py-3 rounded-2xl transition"
              {...register("profileImageUrl", {
                validate: {
                  fileType: (files) => {
                    if (!files?.[0]) return true;

                    return (
                      ["image/png", "image/jpeg"].includes(
                        files[0].type
                      ) || "Only JPG/PNG allowed"
                    );
                  },

                  fileSize: (files) => {
                    if (!files?.[0]) return true;

                    return (
                      files[0].size <= 2 * 1024 * 1024 ||
                      "Max size 2MB"
                    );
                  },
                },
              })}
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />

            {errors.profileImageUrl && (
              <p className="text-red-400 text-sm mt-2">
                {errors.profileImageUrl.message}
              </p>
            )}

            {/* IMAGE PREVIEW */}
            {preview && (
              <div className="flex justify-center mt-5">
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400 shadow-lg shadow-cyan-500/20"
                />
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-bold py-3 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-fuchsia-500/20"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-zinc-400 mt-6 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-cyan-400 hover:text-fuchsia-400 font-medium transition"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;