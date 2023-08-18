import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "../api/axios";
import MainNavbar from "./MainNavbar";
import { useTranslation } from "react-i18next";

import img from "../assets/img/logo750x500.png";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

const LOGIN_URL = "/auth";

const Login: React.FC = () => {
  const { t } = useTranslation("global");

  useEffect(() => {
    document.title = t("login.title");
  }, [t]);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", true);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      resetUser();
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      const axiosError = err as AxiosError
      if (!axiosError?.response) setErrMsg(t("error.noresp"));
      else if (axiosError.response?.status === 400)
        setErrMsg(t("error.missingusrpwd"));
      else if (axiosError.response?.status === 401)
        setErrMsg(t("error.invalidusrpwd"));
      else setErrMsg(t("error.loginfailed"));
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  // Checkbox
  const [showPwd, setShowPwd] = useState(false);

  const togglePassword = () => {
    setShowPwd(!showPwd);
  };

  return (
    <>
      <MainNavbar />
      <section className="preventDrag centerWithNav p-0 appear">
        <div className="container h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src={img}
                className="img-fluid"
                alt="login"
                draggable="false"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="username"
                    ref={userRef}
                    {...userAttribs}
                    autoComplete="on"
                    autoCapitalize="characters"
                    required
                  />
                  <label htmlFor="username" className="form-label">
                    {t("login.id")}
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type={showPwd ? "text" : "password"}
                    className="form-control form-control-lg"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    {t("login.password")}
                  </label>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <Link to="/">{t("login.forgotpwd")}</Link>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check" onChange={togglePassword}>
                    <label className="form-check-label">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      {t("login.showpwd")}
                    </label>
                  </div>
                  <label className="form-check-label" htmlFor="persist">
                    <input
                      id="persist"
                      className="form-check-input me-2"
                      type="checkbox"
                      onChange={() => toggleCheck}
                      checked={check}
                    />
                    {t("login.trustdev")}
                  </label>
                </div>
                <div className="d-flex align-items-center mb-4 pl-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    {t("login.button")}
                  </button>
                  <div
                    ref={errRef}
                    className="ms-4 text-danger"
                    aria-live="assertive"
                  >
                    {errMsg}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
