import React, { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import countries from "i18n-iso-countries";
import enLocate from "i18n-iso-countries/langs/en.json";
import esLocate from "i18n-iso-countries/langs/es.json";
import caLocate from "i18n-iso-countries/langs/ca.json";
import { IUser } from "../api/models";

const Users: React.FC = () => {
  countries.registerLocale(enLocate);
  countries.registerLocale(esLocate);
  countries.registerLocale(caLocate);

  const [lang] = useState(localStorage.getItem("lang")!);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        if (isMounted.current) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  const filteredUsers = (user: IUser) => {
    const stringCleaner = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const hasRole = (roles: string[]) => {
      return roles.some((e) =>
        search
          .toLowerCase()
          .substring(6)
          .replace(/ /g, "")
          .split(",")
          .includes(e)
      );
    };

    return (
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      (search.startsWith("name:") &&
        user.name
          ?.toLowerCase()
          .includes(stringCleaner(search).substring(5))) ||
      (search.startsWith("email:") &&
        user.email
          ?.toLowerCase()
          .includes(stringCleaner(search).substring(6))) ||
      (search.startsWith("phone:") &&
        user.phone?.includes(stringCleaner(search).substring(6))) ||
      (search.startsWith("sex:") &&
        user.sex?.toLowerCase().includes(stringCleaner(search).substring(4))) ||
      (search.startsWith("borndate:") &&
        user.borndate
          .toLocaleDateString()
          .toLowerCase()
          .includes(stringCleaner(search).substring(9))) ||
      (search.startsWith("mod:") &&
        user.mod?.toLowerCase().includes(stringCleaner(search).substring(4))) ||
        (search.startsWith("roles:") &&
        hasRole(Object.keys(user.roles).map((r) => r.toLowerCase()))) ||
      (search.startsWith("id:") &&
        user._id?.toLowerCase().includes(stringCleaner(search).substring(3)))
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

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
    <div className="me-4">
      <div className="input-group card-body m-4 d-flex align-center justify-content-center align-items-arround">
        <input
          type="search"
          className="me-5 w-50"
          onChange={handleSearch}
          value={search}
        />
      </div>
      {users?.length ? (
        <div className="card-group d-flex justify-content-around">
          {users?.map((user, i) =>
            filteredUsers(user) || !search ? (
              <div className="mb-4" style={{ maxWidth: "400px" }} key={i}>
                <div className="card">
                  <img src={user?.image} className="card-img-top" alt={i.toString()} />
                  <div className="card-body p-4">
                    <h5 className="card-title text-center">
                      {user?.username}{" "}
                      <small className="text-muted">#{i}</small>
                    </h5>
                    <p className="card-text">
                      <b>Name:</b>{" "}
                      <span className="text-right">{user?.name}</span>
                    </p>
                    <p className="card-text">
                      <b>Email:</b> {user?.email}
                    </p>
                    <p className="card-text">
                      <b>Phone:</b> {user?.phone}
                    </p>
                    <p className="card-text">
                      <b>Sex:</b> {user?.sex}
                    </p>
                    <p className="card-text">
                      <b>Born Date:</b>{" "}
                      {new Date(user?.borndate).toLocaleDateString(lang)}
                    </p>
                    <p className="card-text">
                      <b>Street:</b> {user?.street}
                    </p>
                    <p className="card-text">
                      <b>City:</b> {user?.city}
                    </p>
                    <p className="card-text">
                      <b>Contry:</b>
                      {countryArr?.map(({ label, value }) =>
                        user?.country === value ? (
                          <>
                            <React.Fragment key={value}>
                              {label} ({value})
                            </React.Fragment>
                          </>
                        ) : (
                          ""
                        )
                      )}
                    </p>
                    <p className="card-text">
                      <b>ZIP:</b> {user?.zip}
                    </p>
                    <p className="card-text">
                      <b>Modality:</b> {user?.mod}
                    </p>
                    <p className="card-text">
                      <b>Roles:</b> {Object.keys(user?.roles).join(", ")}
                    </p>
                    <p className="card-text">
                      <b>UID:</b> <small>{user?._id}</small>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      ) : (
        <p className="ms-4">No users to display</p>
      )}
    </div>
  );
};

export default Users;
