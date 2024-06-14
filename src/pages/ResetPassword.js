import React, { useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Input, Label } from "../components/styledComponent/formInputs";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import { resetPasswordFp } from "../api/usersApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputError, setInputError] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { token } = useParams();

  const validate = () => {
    let passwordError = "";
    let confirmPasswordError = "";

    if (!password) {
      passwordError = "Password  is required, minimum 2 characters";
    }
    if (!confirmPassword) {
      confirmPasswordError =
        "Confirm Password is required, minimum 2 characters";
    }

    if (passwordError || confirmPasswordError) {
      setInputError((curr) => {
        return {
          ...curr,
          password: passwordError,
          confirmPassword: confirmPasswordError,
        };
      });
      return false;
    }
    return true;
  };

  const handleSend = async () => {
    const checkValidate = validate();

    if (checkValidate) {
      if (password === confirmPassword) {
        setInputError({});
        setLoading(true);
        try {
          const data = {
            newPassword: password,
            token,
          };

          await resetPasswordFp(data);

          setLoading(false);
          toast.success("Reset Password successfully");
          setStep(2);
        } catch (err) {
          setLoading(false);
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          toast.error(message);
        }
      } else {
        toast.error("new password and confirm new password musy be the same");
      }
    }
  };
  return (
    <div>
      <HeaderImg title="My Account" />

      {step === 1 && (
        <div className="signin__wrapper">
          <h2>Reset Password</h2>

          <div className="signin__main">
            <div className="signin__main__inputCon">
              <Label htmlFor="password">
                {" "}
                New Password <span>*</span>
              </Label>
              <Input
                id="password"
                type="password"
                error={inputError.password ? true : false}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signin__main__inputCon">
              <Label htmlFor="confirmPassword">
                {" "}
                Confirm New Password <span>*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                error={inputError.confirmPassword ? true : false}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn" onClick={handleSend}>
              {loading ? <Loading button={true} /> : "Send"}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="signin__wrapper">
          <h3 style={{ color: "green", marginBottom: 20 }}>
            Reset password Successful
          </h3>
          <Link to="/login">
            <button className="btnAlt3">Proceed to Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
