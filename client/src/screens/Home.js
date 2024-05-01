import React, { useEffect } from "react";
import Nav from "../components/nav/nav";
import Uploader from "../components/uploader/Uploader";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { auth, signin } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    (() => {
      console.log(auth);
      if (auth == undefined) {
        let tempAuth = JSON.parse(sessionStorage.getItem("auth") || "{}");
        if (Object.entries(tempAuth).length > 0) {
          console.log(tempAuth);
          signin(tempAuth);
        } else {
          navigate("/");
        }
      }
    })();
  }, []);

  return (
    <div>
      {auth == undefined ? undefined : (
        <div>
          <Nav />
          <div className="wrapper">
            <Uploader />
          </div>
        </div>
      )}
    </div>
  );
}
