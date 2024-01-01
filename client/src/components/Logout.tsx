"use client";
import { Button } from "./ui/button";
import { useCookies } from "react-cookie";
const Logout = () => {
  const [cookies, setCookies] = useCookies(["access_token", "username"]);

  const logout = () => {
    setCookies("access_token", "");
    setCookies("username", "");
    window.localStorage.removeItem("userID");
    window.location.href = "/";
  };
  return (
    <>
      {!cookies.access_token ? (
        <div>login</div>
      ) : (
        <Button onClick={logout} variant={"destructive"}>
          Logout
        </Button>
      )}
    </>
  );
};

export default Logout;
