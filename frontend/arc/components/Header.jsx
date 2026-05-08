import { NavLink } from "react-router";
import { useAuth } from "../stores/authStore";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const getProfilePath = () => {
    if (!user) return "/";

    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";

      case "ADMIN":
        return "/admin-profile";

      default:
        return "/user-profile";
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-cyan-500/30">
            M
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide text-white">
              MyBlog
            </h1>

            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Modern Stories
            </p>
          </div>
        </NavLink>

        {/* NAVIGATION */}
        <ul className="flex items-center gap-3 md:gap-5">

          {/* HOME */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-cyan-400"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          {/* NOT AUTHENTICATED */}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-fuchsia-400"
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold px-5 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-fuchsia-500/20"
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {/* AUTHENTICATED USER */}
          {isAuthenticated && (
            <li className="ml-2">

              <NavLink
                to={getProfilePath()}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 px-3 py-2 rounded-full transition-all duration-300"
              >

                {/* PROFILE IMAGE */}
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center text-black font-bold">
                    {user?.firstName?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                {/* USER INFO */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-white leading-none">
                    {user?.firstName || "Profile"}
                  </p>

                  <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                    {user?.role || "User"}
                  </p>
                </div>

              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;