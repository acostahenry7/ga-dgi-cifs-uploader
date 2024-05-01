import React from "react";
import LogoGA from "./logo-ga.png";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Nav() {
  const navigate = useNavigate();

  const { signout } = useAuth();

  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <a className="navbar-brand" href="#">
        <div className="nav-banner nav ">
          <img src={LogoGA} width="50px" height="50" />
          <h3>GRUPO AVANT</h3>
        </div>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{
                cursor: "pointer",
              }}
              onClick={async () => {
                let res = await logout();
                console.log(res);
                if (res.error == true) {
                  alert(res.body);
                } else {
                  signout();
                  sessionStorage.removeItem("auth");
                  navigate("/");
                }
              }}
            >
              Salir
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
