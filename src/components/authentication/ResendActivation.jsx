import React, { useState } from "react";
import { UserAPI } from "../../api/global";
import axios from "../../api/axios";
import image1 from "../../assets/image1.jpg";
import { useNavigate } from "react-router-dom";

const ResendActivation = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Get Email ID from the User
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
  };

  // On submit send an email for activation link if a valid Email ID is provided
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${UserAPI}/resend-activation/${email}`);

      setMessage(response.data.status); // Success Message of Resend Activation email
      setTimeout(() => {
        navigate("/login"); // Redirect to Login page
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;

        // Display all validation errors to the user
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
              Resend Account Activation Link
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
                        ? message === "Account is already activated."
                          ? "special-error d-block badge rounded-pill text-success px-5 w-100 form-control"
                          : "special-error d-block badge rounded-pill text-danger px-5 w-100 form-control"
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

export default ResendActivation;
