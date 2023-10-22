import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import image1 from "../../assets/image1.jpg";
import { UserAPI } from "../../api/global";
import axios from "../../api/axios";

const ActivationSuccess = () => {
  const { token } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.patch(`${UserAPI}/activation/${token}`);

        if (response.status === 200) {
          const data = response.data;
          setMessage(data.message); // Set the activation status message
        } else {
          const errorData = response.data;
          setMessage(errorData.message); // Set the error message
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred during activation.");
      }
    };

    activateAccount();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 order-1">
          <img src={image1} alt="Url Shortener" className="img-fluid" />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 order-2">
          <div className="card">
            <div className="card-header border-0 bg-white fs-2">
              Account Activation
            </div>
            <div className="card-body">
              <div className="mb-3">
                <span
                  className={
                    message
                      ? message === "User is already activated" ||
                        message === "Account activated successfully"
                        ? "text-success" // Apply green text color for success
                        : "text-danger" // Apply red text color for error
                      : "d-none"
                  }
                >
                  {message}
                </span>
                {message === "User is already activated" ||
                message === "Account activated successfully" ? (
                  <p className="mt-2">
                    You can now proceed to <Link to="/login">login</Link>.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationSuccess;
