import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useAuth } from "../../context/Auth";

export default function UserRoute() {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/user-auth`);
        setOk(res.data.ok);
      } catch (error) {
        console.error("Auth check failed:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false); // ✅ Explicitly setting to false if no token
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
