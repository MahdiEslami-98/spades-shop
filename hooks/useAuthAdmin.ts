import getAccessToken from "@/api/getAccessToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useAuthAdmin = () => {
  const router = useRouter();
  useEffect(() => {
    document.title = "پنل مدیریت";
    const token = Cookies.get("refresh_token");
    const userRole = Cookies.get("user_role");
    if (userRole !== "ADMIN") router.push("/login");
    if (token) {
      getAccessToken(token).then((res) => {
        if (res?.status === "success") {
          Cookies.set("access_token", res.token.accessToken);
        } else {
          router.push("/login");
        }
      });
    } else {
      router.push("/login");
    }
  }, []);
};

export default useAuthAdmin;
