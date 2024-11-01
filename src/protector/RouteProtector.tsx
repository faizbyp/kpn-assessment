import { ResponseAuthDarwin, RequestAuthDarwin } from "@/types/AuthDarwin";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { snack } from "@/providers/SnackbarProvider";
import { isAxiosError } from "axios";

export default function RouteProtector() {
  const [searchParams] = useSearchParams();
  const [userState, setUser] = useState("");
  const navigate = useNavigate();
  const verifyLoginDarwin = async ({
    encoded_auth,
    token_client,
  }: RequestAuthDarwin): ResponseAuthDarwin => {
    try {
      const { data } = await API.post(`/auth/darwin`, {
        encoded_payload: encoded_auth,
        token_client: token_client,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await verifyLoginDarwin({
          encoded_auth: searchParams.get("data"),
          token_client: localStorage.getItem("token"),
        });
        if (data.status === 1) {
          if (!localStorage.getItem("token")) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.firstname);
          }
          setUser("client");
        } else {
          setUser("admin");
        }
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          snack.error(error.response?.data.message);
        }
      }
    })();
    return;
  }, []);
  useEffect(() => {
    if (userState === "client") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  }, [userState]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
