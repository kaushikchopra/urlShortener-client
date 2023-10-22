import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import image1 from "../../assets/image1.jpg";

import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { UserAPI } from "../../api/global";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Initializing Values
  const initialValues = {
    username: "",
    password: "",
  };

  // Handle input validation
  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter an email"),
    password: Yup.string().required("Please enter a password"),
  });

  // Handle Login
  const onSubmit = async (values, action) => {
    try {
      const response = await axios.post(`${UserAPI}/login`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response && response.data) {
        const { username } = values;
        const accessToken = response?.data?.accessToken;

        setError(null);
        setAuth({ username, accessToken });

        // Reset form values after submitting
        action.resetForm();

        // Redirect to the page from where the user came
        navigate(from, { replace: true });
      }
    } catch (errors) {
      console.error("Error:", errors);
      if (!errors?.response) {
        // Handle no server error (i.e.) server is not running or responding
        setError("No Server Response");
      } else if (errors?.response?.data) {
        setError(errors.response.data.error);
      } else {
        setError("Login failed");
      }
    }
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validateOnBlur: true,
      validationSchema,
      onSubmit,
    });

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 order-1">
          <img src={image1} alt="Url Shortener" className="img-fluid" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 order-2">
          <div className="card">
            <div className="card-header border-0 bg-white fs-2">Login</div>

            {error && <div className="alert alert-success mt-1">{error}</div>}

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    value={values.username}
                    className="form-control"
                    aria-describedby="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.username && errors.username ? (
                    <p className="form-error text-danger">{errors.username}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password ? (
                    <p className="form-error text-danger">{errors.password}</p>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="persist"
                  className="form-check-input"
                  onChange={togglePersist}
                  checked={persist}
                />
                <label htmlFor="persist" className="form-check-label">
                  {" "}
                  Trust this device
                </label>
              </div>
              <div className="row justify-content-center">
                <div className="col-auto">
                  <span>
                    Forgot Password?{" "}
                    <Link to="/forgot-password">Click here!</Link>
                  </span>
                </div>
                <div className="col-auto">
                  <span>
                    Not a User already?{" "}
                    <Link to="/signup">Signup</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
