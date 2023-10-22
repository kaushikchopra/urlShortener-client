import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { ProgressBar } from "react-loader-spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  //   // eslint-disable-next-line
  // }, [isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <>
          <div className="container bg-light border border-dark rounded w-25 mt-5">
            <div className="d-flex flex-column align-items-center text-center">
              <span className="text-dark fs-4">Loading is in progress...</span>
              <ProgressBar
                width="100"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="#777A7D"
                barColor="#167347"
              />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
