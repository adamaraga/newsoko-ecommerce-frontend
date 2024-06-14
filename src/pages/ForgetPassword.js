import React, { useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Input, Label } from "../components/styledComponent/formInputs";
import Loading from "../components/Loading";
import { forgetPassword } from "../api/usersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let emailError = "";

    if (!email) {
      emailError = "email is required, minimum 2 characters";
    }

    if (emailError) {
      setInputError((curr) => {
        return {
          ...curr,
          email: emailError,
        };
      });
      return false;
    }
    return true;
  };

  const handleSend = async () => {
    const checkValidate = validate();
    if (checkValidate) {
      setInputError({});
      setLoading(true);
      try {
        const data = {
          email,
        };

        await forgetPassword(data);

        setLoading(false);
        toast.success("Email sent successfully");
        setEmail("");
        navigate("/login");
      } catch (err) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    }
  };

  return (
    <div>
      <HeaderImg title="My Account" />

      <div className="signin__wrapper">
        <h2>Forgot Password</h2>

        <div className="signin__main">
          <p>
            Enter your email address and a link will be sent to you to reset
            your password
          </p>
          <div className="signin__main__inputCon">
            <Label htmlFor="email">
              {" "}
              Email address <span>*</span>
            </Label>
            <Input
              id="email"
              type="text"
              value={email}
              error={inputError.email ? true : false}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn" onClick={handleSend}>
            {loading ? <Loading button={true} /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
