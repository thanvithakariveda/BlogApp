import { create } from "zustand";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export const useAuth = create((set) => ({

  currentUser: null,

  loading: false,

  isAuthenticated: false,

  error: null,

  // LOGIN
  login: async (userCred) => {

    try {

      set({
        loading: true,
        error: null,
      });

      console.log("Sending Login Data:", userCred);

      const res = await axios.post(

        `${BASE_URL}/auth/login`,

        {
          email: userCred.email,
          password: userCred.password,
        },

        {
          withCredentials: true,
        }

      );

      console.log("Login Success:", res.data);

      if (res.status === 200) {

        set({

          currentUser: res.data.payload,

          loading: false,

          isAuthenticated: true,

          error: null,

        });

      }

    } catch (err) {

      console.log(
        "Backend Error:",
        err.response?.data
      );

      set({

        loading: false,

        isAuthenticated: false,

        currentUser: null,

        error:
          err.response?.data?.message ||
          "Login failed",

      });

    }

  },

  // LOGOUT
  logout: async () => {

    try {

      set({
        loading: true,
      });

      const res = await axios.get(

        `${BASE_URL}/auth/logout`,

        {
          withCredentials: true,
        }

      );

      if (res.status === 200) {

        set({

          currentUser: null,

          loading: false,

          isAuthenticated: false,

          error: null,

        });

      }

    } catch (err) {

      console.log(
        "Logout Error:",
        err.response?.data
      );

      set({

        loading: false,

        isAuthenticated: false,

        currentUser: null,

        error:
          err.response?.data?.message ||
          "Logout failed",

      });

    }

  },

}));