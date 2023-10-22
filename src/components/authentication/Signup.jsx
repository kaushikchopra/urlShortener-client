import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/image1.jpg";
import axios from "../../api/axios";

import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { UserAPI } from "../../api/global";

const SignUp = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  };

  // Input validation
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3)
      .max(25)
      .required("Please enter your First Name"),
    lastName: Yup.string()
      .min(1)
      .max(25)
      .required("Please enter your Last Name"),
    username: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .min(6)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
        "Please use at least one upper, one lower case characters, one special character and one number"
      )
      .required("Please enter your password"),
  });

  // Handle Signup
  const onSubmit = async (values, action) => {
    try {
      const response = await axios.post(`${UserAPI}/signup`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);

      if (response && response.data) {
        setError(null);
        setSuccess(response.data.status);
      }

      // Reset form values after submitting
      action.resetForm();
    } catch (errors) {
      console.error(errors);
      if (!errors?.response) {
        // Handle no server error (i.e.) server is not running or responding
        setError("No Server Response");
        setSuccess(null);
      } else if (errors.response && errors.response.data) {
        // Handle other errors
        setError(errors.response.data.error);
        setSuccess(null);
      }
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validateOnBlur: true,
      validationSchema,
      onSubmit,
    });

  // console.log(errors);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 order-1">
          <img src={image1} alt="Url Shortener" className="img-fluid shadow" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 order-2">
          <div className="card shadow">
            <form onSubmit={handleSubmit}>
              <div className="card-header border-0 bg-white d-flex justify-content-between">
                <div className="signup fs-2">Signup</div>
              </div>

              {success && (
                <div className="alert alert-success mt-1">{success}</div>
              )}
              {error && <div className="alert alert-success mt-1">{error}</div>}

              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName ? (
                    <p className="form-error text-danger">{errors.firstName}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.lastName && errors.lastName ? (
                    <p className="form-error text-danger">{errors.lastName}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    autoComplete="off"
                    name="username"
                    id="username"
                    placeholder="Email"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username ? (
                    <p className="form-error text-danger">{errors.username}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error text-danger">{errors.password}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={Formik.isValid}
                >
                  Signup
                </button>
              </div>
            </form>

            <div className="row justify-content-center">
              <div className="col-auto">
                <span>
                  Resend Activation Link?{" "}
                  <Link to="/resend-activation">Click here!</Link>
                </span>
              </div>
              <div className="col-auto mb-2">
                <span>
                  Already a user? <Link to="/login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
