import React, { useState } from "react";
import "./login.css";
import LogoGA from "../../resources/logo-ga.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MutatingDots } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { auth, signin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  let companyOptions = [
    { label: "Lasa Motors", value: "DB_LM" },
    { label: "Avant Auto", value: "DB_AA" },
    { label: "Gar 210", value: "DB_GA" },
    { label: "Motoplex", value: "DB_MP" },
    { label: "KTM Import", value: "DB_KI" },
    { label: "Cycle Lab", value: "DB_CL" },
    { label: "Avant Auto TEST", value: "DB_AA_TEST" },
  ];

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      companyDB: "DB_LM",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Introduzca un usuario."),
      password: Yup.string().required("Introduzca una contraseña."),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      //console.log (values);

      loginForm.setFieldValue("password", "");
      let response;
      try {
        setIsLoading(true);
        response = await login(values);
        setIsLoading(false);
        if (response.error == true) {
          switch (response.status) {
            case 401:
              setLoginError(
                "Error de autenticación, usuario o contraseña incorrectos."
              );

              break;

            default:
              break;
          }
        } else {
          sessionStorage.setItem("auth", JSON.stringify(response.body));
          signin(response.body);

          navigate("/home");
          //console.log (response);
        }
      } catch (error) {
        //console.log (error);
      }
    },
  });

  return (
    <div className="login-bg">
      <div className="login-form-wrapper shadow">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={LogoGA} />
          <h4 className="text-center">Grupo Avant</h4>
        </div>

        <div className="form">
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              autoCapitalize="none"
              placeholder="Usuario"
              className="form-control"
              valule={loginForm.values.username}
              onChange={(event) => {
                loginForm.setFieldValue("username", event.target.value);
              }}
            />
            <span className="login-form-errors">
              {loginForm.errors.username}
            </span>
          </div>
          <div className="form-group mt-2">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="*****"
              className="form-control"
              value={loginForm.values.password}
              onChange={(event) => {
                loginForm.setFieldValue("password", event.target.value);
              }}
            />
            <span className="login-form-errors">
              {loginForm.errors.password}
            </span>
          </div>
          <div className="form-group mt-2">
            <label>Contraseña</label>
            <select
              className="form-control"
              value={loginForm.values.companyDB}
              onChange={(event) => {
                loginForm.setFieldValue("companyDB", event.target.value);
              }}
            >
              {companyOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <div style={{ textAlign: "center" }}>
              <span className="login-form-errors">{loginError}</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <span
              className="btn btn-danger w-100"
              onClick={loginForm.handleSubmit}
            >
              Enviar
            </span>
          </div>
          <div className="mt-2" style={{ textAlign: "center" }}>
            <a
              href="mailto:h.acosta@grupoavant.com.do"
              style={{ textDecoration: "none", fontSize: 14 }}
            >
              No puedo acceder
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isLoading && (
              <MutatingDots
                height="90"
                width="90"
                color="#c2d1e1"
                secondaryColor="#c2d1e1"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
