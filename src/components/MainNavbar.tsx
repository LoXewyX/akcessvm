import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import img from "../assets/img/logo.png";
import { useTranslation } from "react-i18next";

import { Container, Nav, Navbar, Form } from "react-bootstrap";

const MainNavbar: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState(localStorage.getItem("lang")!);

  const changeLanguage = (opt: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = opt.target.value;
    setLang(selectedLang);
    localStorage.setItem("lang", selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-wd">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand p-0" to="/welcome">
            AKCESSVM
            <img className="ms-2" src={img} width="45" alt="navbar-logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              className="nav-link mx-2 no-gutters text-nowrap"
              to="/login"
            >
              {t("navbar.login")}
            </NavLink>
            <NavLink className="nav-link mx-2 text-nowrap" to="/register">
              {t("navbar.register")}
            </NavLink>
            <Form.Select
              aria-label="Language"
              onChange={changeLanguage}
              value={lang}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ca">Català</option>
            </Form.Select>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
