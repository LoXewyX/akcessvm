import { useRef, useState, useEffect } from "react";
import {
  faInfoCircle,
  faCircleExclamation,
  faCircleRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

import Success from "./Success";
import MainNavbar from "./MainNavbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import { useTranslation } from "react-i18next";
import countries from "i18n-iso-countries";
import enLocate from "i18n-iso-countries/langs/en.json";
import esLocate from "i18n-iso-countries/langs/es.json";
import caLocate from "i18n-iso-countries/langs/ca.json";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import img from "../assets/img/logo750x500.png";

const Register = () => {
  const { t } = useTranslation("global");

  countries.registerLocale(enLocate);
  countries.registerLocale(esLocate);
  countries.registerLocale(caLocate);

  const countryObj = countries.getNames(
    localStorage?.getItem("lang") ||
      (navigator.language || navigator.language)?.substring(0, 2)
  );
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const REGISTER_URL = "/register";

  useEffect(() => {
    document.title = t("register.title");
  });

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const captcha = useRef<ReCAPTCHA | null>(null);

  const [name, setName] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");
  const [validUser, setValidUser] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [sex, setSex] = useState<string>("");
  const [validSex, setValidSex] = useState<boolean>(false);

  const [borndate, setBornDate] = useState<Date | null>(null);
  const [validDate, setValidDate] = useState<boolean>(false);

  const [street, setStreet] = useState<string>("");
  const [validStreet, setValidStreet] = useState<boolean>(false);

  const [city, setCity] = useState<string>("");
  const [validCity, setValidCity] = useState<boolean>(false);

  const [country, setCountry] = useState<string>("");
  const [validCountry, setValidCountry] = useState<boolean>(false);

  const [zip, setZip] = useState<string>("");
  const [validZip, setValidZip] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [validCaptcha, setValidCaptcha] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onChangeCaptcha = () => {
    if (captcha.current) {
      const captchaValue = captcha.current.getValue();
      if (captchaValue) {
        setValidCaptcha(true);
      }
    }
  };

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  useEffect(() => {
    const NAME_REGEX =
      /[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    function validateUser(dni: string) {
      const USER_REGEX = /^[XYZ]?\d{5,8}[A-Z]$/;
      if (USER_REGEX.test(dni)) {
        const n =
          Number(
            dni
              .substring(0, dni.length - 1)
              .replace("X", "0")
              .replace("Y", "1")
              .replace("Z", "2")
          ) % 23;
        const l = "TRWAGMYFPDXBNJZSQVHLCKET".charAt(n);
        return l === dni.charAt(dni.length - 1);
      }
      return false;
    }
    setValidUser(validateUser(user));
  }, [user]);

  useEffect(() => {
    setValidSex(
      typeof sex === "string" &&
        (sex === "male" || sex === "female" || sex === "other")
    );
  }, [sex]);

  useEffect(() => {
    setValidDate(borndate !== null);
  }, [borndate]);

  useEffect(() => {
    const NOSSTARTINGPACE_REGEX = /^[^A\s].*/;
    setValidStreet(NOSSTARTINGPACE_REGEX.test(street));
  }, [street]);

  useEffect(() => {
    const NONUMBER_REGEX = /^[^A\s^0-9]((?!(0))[^0-9]*)$/;
    setValidCity(NONUMBER_REGEX.test(city));
  }, [city]);

  useEffect(() => {
    setValidCountry(false);
    countryArr?.map(({ value }) =>
      value === country ? setValidCountry(true) : ""
    );
  }, [countryArr, country]);

  useEffect(() => {
    const ZIP_REGEX = /^[0-9]{5,9}$/;
    setValidZip(ZIP_REGEX.test(zip));
  }, [zip]);

  useEffect(() => {
    const PWD_REGEX =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,64}$/;
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !validName ||
      !validUser ||
      !validSex ||
      !validDate ||
      !setValidPwd ||
      !setValidMatch ||
      !validCaptcha
    ) {
      setErrMsg(t("error.invalidentry"));
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({
          name,
          user,
          sex,
          borndate,
          street,
          city,
          country,
          zip,
          pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      setName("");
      setUser("");
      setSex("");
      setBornDate(null);
      setStreet("");
      setPwd("");
      setMatchPwd("");
      setValidCaptcha(false);
    } catch (err) {
      const axiosError = err as AxiosError
      if (!axiosError.response) setErrMsg(t("error.noresp"));
      else if (axiosError.response.status === 409)
        setErrMsg(t("error.usrtaken"));
      else setErrMsg(t("error.regfail"));

      errRef.current!.focus();
    }
  };

  return success ? (
    <Success />
  ) : (
    <>
      <MainNavbar />
      <div className="preventDrag centerWithNav appear">
        <div className="container h-100">
          <div className="row d-flex  justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src={img}
                className="img-fluid stickyimg"
                alt="register"
                draggable="false"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 mt-4">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="name"
                    ref={userRef}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    aria-invalid={validName ? "false" : "true"}
                    required
                  />
                  <label htmlFor="name" className="form-label">
                    {t("register.name")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validName ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="username"
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value.toUpperCase())}
                    value={user}
                    aria-invalid={validUser ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    required
                  />
                  <label htmlFor="username" className="form-label">
                    {t("register.id.0")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validUser ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                  <p
                    id="uidnote"
                    className={
                      userFocus && user && !validUser
                        ? "instructions"
                        : "d-none"
                    }
                  >
                    <FontAwesomeIcon icon={faCircleRight} className="me-2" />
                    {t("register.id.1")}
                    <br />
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                    {t("register.id.2")}
                    <br />
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                    {t("register.id.3")}
                  </p>
                </div>
                <div className="form-outline mb-4">
                  <Form.Select
                    aria-label="sex"
                    className="form-control form-control-lg dropdown_menu"
                    id="sex"
                    onChange={(e) => setSex(e.target.value)}
                    value={sex}
                    required
                  >
                    <option hidden>{t("register.gender.1")}</option>
                    <option value="male">{t("register.gender.2")}</option>
                    <option value="female">{t("register.gender.3")}</option>
                    <option value="other">{t("register.gender.4")}</option>
                  </Form.Select>
                  <label htmlFor="sex" className="form-label">
                    {t("register.gender.0")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validSex ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <DatePicker
                    className="form-control form-control-lg w-100"
                    selected={borndate}
                    onChange={(e: Date) => setBornDate(e)}
                    dateFormat="dd/MM/yyyy"
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    required
                  />
                  <label className="form-label">
                    {t("register.born")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validDate ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <Form.Select
                    aria-label="country"
                    className="form-control form-control-lg"
                    id="country"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    required
                  >
                    <option hidden>{t("register.country.1")}</option>
                    {!!countryArr?.length &&
                      countryArr.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                  </Form.Select>
                  <label htmlFor="country" className="form-label">
                    {t("register.country.0")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validCountry ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="city"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    aria-invalid={validCity ? "false" : "true"}
                    required
                  />
                  <label className="form-label">
                    {t("register.city")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validCity ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="street"
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                    aria-invalid={validStreet ? "false" : "true"}
                    required
                  />
                  <label className="form-label">
                    {t("register.street")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validStreet ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="zip"
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                    aria-invalid={validZip ? "false" : "true"}
                    required
                  />
                  <label className="form-label">
                    {t("register.zip")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validZip ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    {t("register.password.0")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validPwd ? "ms-1 d-inline text-success" : "d-none"
                      }
                    />
                  </label>
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "d-none"
                    }
                  >
                    <FontAwesomeIcon icon={faCircleRight} className="me-2" />
                    {t("register.password.1")}
                    <br />
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="me-2"
                    />
                    {t("register.password.2")}
                    <br />
                    <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                    {t("register.password.3")}
                  </p>
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <label className="form-label" htmlFor="confirm_pwd">
                    {t("register.confpwd.0")}
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        validMatch && matchPwd
                          ? "ms-1 d-inline text-success"
                          : "d-none"
                      }
                    />
                  </label>
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "d-none"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="me-2"
                    />
                    {t("register.confpwd.1")}
                  </p>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <Link to="/login">{t("register.alreadyreg")}</Link>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LdsE4YiAAAAACjY_ZCS9HtqLI1m2MR0o-LhDlJE"
                    onChange={onChangeCaptcha}
                  />
                </div>
                <div className="d-flex align-items-center mb-4 pl-4">
                  <button
                    type="submit"
                    // hide captcha on server
                    className="btn btn-primary btn-lg btn-block"
                    disabled={
                      !validName ||
                      !validSex ||
                      !validUser ||
                      !validPwd ||
                      !validDate ||
                      !validStreet ||
                      !validCity ||
                      !validCountry ||
                      !validZip ||
                      !validMatch ||
                      !validCaptcha
                        ? true
                        : false
                    }
                  >
                    {t("register.button")}
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
      </div>
    </>
  );
};

export default Register;
