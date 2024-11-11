import { create } from "zustand";
import { LoginRes, Auth } from "@/types/AuthAdmin";
import { persist } from "zustand/middleware";

const useAuthStore = create<Auth>()(
  persist(
    (set, get) => ({
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
      },

      checkAuth: () => {
        const access_token = get().access_token;
        if (access_token) {
          set({
            access_token: access_token,
          });
        } else {
          window.location.replace("/");
        }
      },

      setAccessToken: (newToken) => {
        set({ access_token: newToken });
      },

      signOut: () => {
        set({
          username: "",
          fullname: "",
          email: "",
          access_token: "",
          refresh_token: "",
        });
        localStorage.removeItem("auth-storage");
        window.location.replace("/");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        username: state.username,
        fullname: state.fullname,
        email: state.email,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
    }
  )
);

export default useAuthStore;
