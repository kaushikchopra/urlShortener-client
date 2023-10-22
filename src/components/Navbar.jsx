import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { UserAPI } from "../api/global";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPrivate.get(`${UserAPI}/user`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        if (response?.data) {
          // console.log(`UserData: ${JSON.stringify(response.data)}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.log("Navbar User Data error: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark "
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          URL Shortener
        </Link>
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Url Shortener
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/created-urls" ? "active" : ""
                }`}
                to="/created-urls"
              >
                URLs Data
              </Link>
            </li>

            {auth ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  {userData && (
                    <span className="text-white mx-2">
                      {userData.firstName} {userData.lastName}
                    </span>
                  )}
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  type="button"
                  className="btn btn-success mx-2"
                  to="/login"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
