// import { API } from "@/utils/api";
// import { useEffect } from "react";
// import useAuthStore from "./useAuthStore";

// const useAPI = () => {
//   const accessToken = useAuthStore((state) => state.access_token);
//   const setAccessToken = useAuthStore((state) => state.setAccessToken);

//   useEffect(() => {
//     const requestIntercept = API.interceptors.request.use(
//       (config) => {
//         if (!config.headers["Authorization"]) {
//           config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = API.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 403 && !prevRequest?.sent) {
//           prevRequest.sent = true;
//           const reqAccessToken = await API.post("/");
//           prevRequest.headers["Authorization"] = `Bearer ${reqAccessToken}`;
//           return API(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       API.interceptors.request.eject(requestIntercept);
//       API.interceptors.response.eject(responseIntercept);
//     };
//   }, [accessToken]);

//   return API;
// };

// export default useAPI;
