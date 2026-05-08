import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    login,
    currentUser,
    loading,
    error,
    isAuthenticated,
  } = useAuth((state) => state);

  const onUserLogin = (userCredObj) => {
    login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      if (currentUser.role === "USER") {
        navigate("/user-profile");
      }

      if (currentUser.role === "AUTHOR") {
        navigate("/author-profile");
      }

      if (currentUser.role === "ADMIN") {
        navigate("/admin-profile");
      }
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-cyan-400 text-xl animate-pulse tracking-widest">
          Authenticating...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/20 blur-3xl rounded-full"></div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center text-black text-2xl font-black shadow-lg shadow-cyan-500/20">
            M
          </div>

          <h2 className="text-4xl font-black text-white mt-5">
            Welcome Back
          </h2>

          <p className="text-zinc-400 mt-2">
            Sign in to continue your journey
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onUserLogin)}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-black/40 border border-zinc-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-white px-4 py-3 rounded-2xl transition duration-300"
              {...register("email", {
                required: "Email is required",

                validate: (value) =>
                  value.trim().length > 0 ||
                  "Email cannot be empty",
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
              className="w-full bg-black/40 border border-zinc-700 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 outline-none text-white px-4 py-3 rounded-2xl transition duration-300"
              {...register("password", {
                required: "Password is required",

                validate: (value) =>
                  value.trim().length > 0 ||
                  "Password cannot be empty",
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-cyan-400 hover:text-fuchsia-400 transition"
            >
              Forgot password?
            </a>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-bold py-3 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-fuchsia-500/20"
          >
            Sign In
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-zinc-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-cyan-400 hover:text-fuchsia-400 font-medium transition"
          >
            Create One
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;