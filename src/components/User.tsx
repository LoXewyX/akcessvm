import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleDot,
  faCircleInfo,
  faMars,
  faVenus,
  faBriefcase,
  faMarsAndVenus,
  faLocationDot,
  faEnvelope,
  faPhone,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./Sidebar";
import countries from "i18n-iso-countries";
import enLocate from "i18n-iso-countries/langs/en.json";
import esLocate from "i18n-iso-countries/langs/es.json";
import caLocate from "i18n-iso-countries/langs/ca.json";
import "../sass/User.sass";
import useUserData from "../hooks/useUserData";
import useIds from "../hooks/useIds";

countries.registerLocale(enLocate);
countries.registerLocale(esLocate);
countries.registerLocale(caLocate);

const User = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("global");
  const [name, setName] = useState("");
  const user = useUserData();
  const usersId = useIds();

  useEffect(() => {
    if (user && user.name && !name) {
      setName(user.name.split(/\s+/)[0]);
    }
  }, [name, user]);

  if (!user || !usersId || !id) {
    return (
      <>
        <Sidebar />
        <section id="content">Invalid id</section>
      </>
    );
  }

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
  return (
    <>
      <Sidebar />
      <section id="content">
        <div className="mb20">
          <div className="media-left pr30 media-middle">
            <img
              className="media-object mw150 rounded-circle shadow img-fluid minw-50"
              src={user?.image}
              width="200"
              height="200"
              alt="user"
              draggable="false"
            />
          </div>
          <div className="media-body media-middle">
            <h2 className="media-heading">
              {user?.name}
              {user?.sex === "male" ? (
                <FontAwesomeIcon
                  icon={faMars}
                  width="24"
                  height="24"
                  className="ms-2"
                />
              ) : user?.sex === "female" ? (
                <FontAwesomeIcon
                  icon={faVenus}
                  width="24"
                  height="24"
                  className="ms-2"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faMarsAndVenus}
                  width="24"
                  height="24"
                  className="ms-2"
                />
              )}
            </h2>
            <p className="lead">{user?.mod ? user?.mod : t("user.mod")}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="panel">
              <div className="panel-heading">
                <span className="panel-icon"></span>
                <span className="panel-title">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    width="12"
                    height="12"
                    className="me-2"
                  />
                  {t("user.about")}
                </span>
              </div>
              <div className="panel-body pn" style={{ wordBreak: "break-all" }}>
                <p>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    width="12"
                    height="12"
                    className="me-2"
                  />
                  {countryArr?.map(({ label, value }) =>
                    user?.country === value ? <>{label}</> : ""
                  )}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    width="12"
                    height="12"
                    className="me-2"
                  />
                  {user?.email}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faPhone}
                    width="12"
                    height="12"
                    className="me-2"
                  />
                  {user?.phone}
                </p>
              </div>
            </div>
            <div className="panel">
              <div className="panel-heading">
                <span className="panel-title">
                  <FontAwesomeIcon
                    icon={faHashtag}
                    width="12"
                    height="12"
                    className="me-2"
                  />
                  {t("user.sm")}
                </span>
              </div>
              {/* <div className="panel-body pb5">
                  {c !== Object.keys(user.socNetwk).length ? (
                    <>
                      {user.socNetwk["linkedIn"] ? (
                        <p>
                          <a
                            href={user.socNetwk["linkedIn"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            LinkedIn
                          </a>
                        </p>
                      ) : (
                        ""
                      )}{" "}
                      {user.socNetwk["instagram"] ? (
                        <p>
                          <a
                            href={user.socNetwk["instagram"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faInstagram}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            Instagram
                          </a>
                        </p>
                      ) : (
                        ""
                      )}{" "}
                      {user.socNetwk["twitter"] ? (
                        <p>
                          <a
                            href={user.socNetwk["twitter"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faTwitter}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            Twitter
                          </a>
                        </p>
                      ) : (
                        ""
                      )}{" "}
                      {user.socNetwk["facebook"] ? (
                        <p>
                          <a
                            href={user.socNetwk["facebook"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faFacebook}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            Facebook
                          </a>
                        </p>
                      ) : (
                        ""
                      )}{" "}
                      {user.socNetwk["youtube"] ? (
                        <p>
                          <a
                            href={user.socNetwk["youtube"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faYoutube}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            Youtube
                          </a>
                        </p>
                      ) : (
                        ""
                      )}{" "}
                      {user.socNetwk["pinterest"] ? (
                        <p>
                          <a
                            href={user.socNetwk["pinterest"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faPinterest}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            Pinterest
                          </a>
                        </p>
                      ) : (
                        ""
                      )}{" "}
                      {user.socNetwk["tiktok"] ? (
                        <p>
                          <a
                            href={user.socNetwk["tiktok"]}
                            className="text-decoration-none"
                          >
                            <FontAwesomeIcon
                              icon={faTiktok}
                              width="12"
                              height="12"
                              className="me-2 text-dark"
                            />
                            TikTok
                          </a>
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <p>No social networks available</p>
                  )}
                </div> */}
            </div>
          </div>
          <div className="col-md-6 panel">
            <div className="panel-heading">
              <span className="panel-icon"></span>
              <span className="panel-title">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  width="12"
                  height="12"
                  className="me-2"
                />
                {t("user.skills")}
              </span>
            </div>
            {/* <div className="panel-body pb5">
                {user?.skills ?? "" ? (
                  user.skills.map((link, i) => (
                    <p key={i}>
                      <FontAwesomeIcon
                        icon={faCircleDot}
                        width="12"
                        height="12"
                        className="me-2"
                      />
                      {link}
                    </p>
                  ))
                ) : (
                  <p>{t("user.emptyskills")}</p>
                )}
              </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
