import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className=" p-5 bg-secondary text-center">
      <h1>Oops!</h1>
      <p>404 Page Not Found</p>
      <div className="d-flex justify-content-center align-items-center">
        <Link to="/dashboard" className="btn btn-primary">
          Go back to Dashboard
        </Link>
      </div>
    </article>
  );
};

export default Missing;
