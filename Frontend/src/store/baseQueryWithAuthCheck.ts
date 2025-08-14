import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants/baseUrl";
import { toast } from "react-toastify";


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, ) => {
    const token = localStorage.getItem("adminToken")

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuthCheck: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // If backend sends a new access token in header, update storage immediately
  const newToken = result.meta?.response?.headers.get("token");
  if (newToken) {
    localStorage.setItem("adminToken", newToken);
  }

  // Endpoints that should SKIP token check
  const skipAuthCheck = ["login", "signup", "adminLogin"];


  if (
    result.error &&
    result.error.status === 401 &&
    !skipAuthCheck.includes(api.endpoint)
  ) {
   
    toast.error("Session expired! Logging out...");
    localStorage.removeItem("adminToken");
    setTimeout(() => {
        window.location.href = "/admin/login";
    }, 1500);
  }

  return result;
};

export default baseQueryWithAuthCheck;
