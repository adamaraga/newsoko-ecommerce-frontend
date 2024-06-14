import React, { useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { verifyEmail } from "../api/usersApi";

const VerifyMail = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const handleVerify = async () => {
      setLoading(true);
      try {
        await verifyEmail(token);

        setLoading(false);
        setSuccess(true);
      } catch (err) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    };

    handleVerify();
  }, [token]);

  return (
    <div>
      <HeaderImg title="My Account" />
      <div className="signin__wrapper">
        {loading ? (
          <Loading />
        ) : success ? (
          <>
            <h3 style={{ color: "green", marginBottom: 20 }}>
              Email Address verification Successful
            </h3>
            <Link to="/login">
              <button className="btnAlt3">Proceed to Login</button>
            </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default VerifyMail;
