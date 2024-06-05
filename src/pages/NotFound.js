import React, { useEffect } from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>Oops! You're Lost</h2>
      <p>The page you are lookinng for was not found</p>

      <Link to="/">
        <Button title="Back To Home" />
      </Link>
    </div>
  );
};

export default NotFound;
