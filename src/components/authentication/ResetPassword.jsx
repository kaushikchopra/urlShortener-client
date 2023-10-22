import axios from "../../api/axios";
import React, { useState } from "react";
import { UserAPI } from "../../api/global";
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../../assets/image1.jpg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  // Set new password to the User
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "new-password") {
      setNewPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${UserAPI}/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      console.log(response.data);
      setMessage(response.data.status);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;

        // display all validation errors to the user
        const errorMessages = validationErrors.map((error) => error.msg);

        setMessage(errorMessages.join("\n"));
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
              Reset Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="new-password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    className="form-control"
                    value={newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  {message === "Password reset successfully" ? (
                    <span className="d-block badge rounded-pill text-success px-4 w-100 form-control">
                      {message}
                    </span>
                  ) : (
                    message && (
                      <div className="w-100 form-control">
                        {message.includes("\n") ? (
                          message.split("\n").map((errorMessage, index) => (
                            <div
                              key={index}
                              className={`d-block badge rounded-pill text-danger small-text ${
                                errorMessage ===
                                "New Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
                                  ? "special-error" // Apply custom style for the specific error message
                                  : ""
                              }`}
                            >
                              {errorMessage}
                            </div>
                          ))
                        ) : (
                          <div className="d-block badge rounded-pill text-danger small-text">
                            {message}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
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

export default ResetPassword;
