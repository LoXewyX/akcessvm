import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../sass/Sidebar.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faBusinessTime,
  faGear,
  faPen,
  faRocket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import useLogout from "../hooks/useLogout";
import { useTranslation } from "react-i18next";

import ROLES from "../api/roles.json";
import useUserData from "../hooks/useUserData";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useUserData();

  interface ActiveNavLinkProps {
    to: string;
    children: React.ReactNode;
  }

  const ActiveNavLink: React.FC<ActiveNavLinkProps> = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={window.location.pathname === to ? "active-link" : ""}
      >
        {children}
      </NavLink>
    );
  };

  // Html
  const { t } = useTranslation("global");

  // Logout
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  // Toggle
  const [hide, setHidden] = useState(false);

  const toggle = () => {
    setHidden(!hide);
  };

  return (
    user && (
      <div className="sidebar shadow">
        <div className={`navigation ${hide ? "active " : ""}`}>
          <div className="menu_toggle" onClick={toggle}></div>
          <div className="profile">
            <div className="imgBx shadow">
              <img src={user?.image} alt="user" draggable="false" />
            </div>
          </div>
          <div className="box20px">
            <div className="text-center userdata">
              <div id="name">{user?.name}</div>
              <div id="id">{user?.username}</div>
              <div id="group">{user.mod}</div>
            </div>
            <div className="myborder"></div>
          </div>
          <ul className="menu">
            {user?.roles["Admin"] === ROLES.Admin ? (
              <li title="Admin">
                <NavLink
                  to="/admin"
                  id="admin"
                  style={({ isActive }) => ({
                    boxShadow: isActive
                      ? "0 0 15px rgba(255, 105, 97, 0.8)"
                      : "",
                  })}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faRocket} />
                  </span>
                  <span className="text">{t("sidebar.admin")}</span>
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {user?.roles["Editor"] === ROLES.Editor ? (
              <li title="Editor">
                <NavLink
                  to="/editor"
                  id="editor"
                  style={({ isActive }) => ({
                    boxShadow: isActive
                      ? "0 0 15px rgba(97, 255, 105, 0.8)"
                      : "",
                  })}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  <span className="text">{t("sidebar.editor")}</span>
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {user?.roles["Admin"] === ROLES.Admin ||
            user?.roles["Editor"] === ROLES.Editor ? (
              <li title="Schedule">
                <NavLink
                  to="/schedule"
                  id="schedule"
                  style={({ isActive }) => ({
                    boxShadow: isActive
                      ? "0 0 15px rgba(97, 168, 255, 0.8)"
                      : "",
                  })}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faBusinessTime} />
                  </span>
                  <span className="text">{t("sidebar.schedule")}</span>
                </NavLink>
                <div className="myborder"></div>
              </li>
            ) : (
              ""
            )}
            <li title="Home">
              <ActiveNavLink to="/">
                <span className="icon">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                <span className="text">{t("sidebar.home")}</span>
              </ActiveNavLink>
            </li>
            <li title="Profile">
              <ActiveNavLink to={`/user/${user?._id}`}>
                <span className="icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="text">{t("sidebar.profile")}</span>
              </ActiveNavLink>
            </li>
            <li title="Settings">
              <ActiveNavLink to="/settings">
                <span className="icon">
                  <FontAwesomeIcon icon={faGear} />
                </span>
                <span className="text">{t("sidebar.settings")}</span>
              </ActiveNavLink>
            </li>
            <li title="Logout">
              <a onClick={signOut}>
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowRightToBracket} />
                </span>
                <span className="text">{t("sidebar.logout")}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default Sidebar;
