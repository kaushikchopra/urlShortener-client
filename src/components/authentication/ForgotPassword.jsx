import React, { useState } from "react";
import { UserAPI } from "../../api/global";
import axios from "../../api/axios";
import image1 from "../../assets/image1.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Get Email ID from the User
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
  };

  // On submit send an email for Password reset if a valid Email ID is provided
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${UserAPI}/forgot-password`, {
        email,
      });

      setMessage(response.data.status); // Success Message of Password reset email
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;

        // display all validation errors to the user
        const errorMessages = validationErrors.map((error) => error.msg);

        setMessage(errorMessages.toString());
      } else {
        // Handle other error scenarios
        setMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 order-1">
          <img src={image1} alt="Url Shortener" className="img-fluid" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 order-2">
          <div className="card">
            <div className="card-header border-0 bg-white fs-2">
              Forgot Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="form-control"
                    aria-describedby="emailId"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <span
                    className={
                      message
                        ? message === "User logged in successfully!"
                          ? "d-block badge rounded-pill text-success px-5 w-100 form-control"
                          : "d-block badge rounded-pill text-danger px-5 w-100 form-control"
                        : "d-none"
                    }
                  >
                    {message}
                  </span>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
