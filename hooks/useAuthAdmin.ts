import getAccessToken from "@/api/getAccessToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthAdmin = () => {
  const router = useRouter();
  useEffect(() => {
    document.title = "پنل مدیریت";
    const token = sessionStorage.getItem("refresh_token");
    const userRole = sessionStorage.getItem("user_role");
    if (userRole !== "ADMIN") router.push("/login");
    if (token) {
      getAccessToken(token).then((res) => {
        if (res?.status === "success") {
          sessionStorage.setItem("access_token", res.token.accessToken);
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
