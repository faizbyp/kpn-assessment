import { create } from "zustand";
import Cookies from "js-cookie";
import { LoginRes, Auth } from "@/types/AuthAdmin";
import { persist } from "zustand/middleware";

const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      username: "",
      fullname: "",
      email: "",
      access_token: "",
      refresh_token: "",

      setAuth: (loginRes: LoginRes) => {
        set({
          username: loginRes.username,
          fullname: loginRes.fullname,
          email: loginRes.email,
          access_token: loginRes.access_token,
          refresh_token: loginRes.refresh_token,
        });
        Cookies.set("access_token", loginRes.access_token);
        Cookies.set("refresh_token", loginRes.refresh_token);
      },

      checkAuth: () => {
        const access_token = Cookies.get("access_token");
        if (access_token) {
          set({
            access_token: access_token,
          });
        } else {
          window.location.replace("/");
        }
      },

      refreshToken: () => {},

      signOut: () => {
        set({
          username: "",
          fullname: "",
          email: "",
          access_token: "",
          refresh_token: "",
        });
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        localStorage.removeItem("user-storage");
        window.location.replace("/");
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        username: state.username,
        fullname: state.fullname,
        email: state.email,
      }),
    }
  )
);

export default useAuthStore;
