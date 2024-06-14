import React, { useContext, useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Link, useNavigate } from "react-router-dom";
import { Input, Label } from "../components/styledComponent/formInputs";
import { toast } from "react-toastify";
import { Context } from "../context/MainContext";
import { login } from "../api/usersApi";
import { userLoginSuccess } from "../context/Action";
import Loading from "../components/Loading";

const Signin = () => {
  const { dispatch, user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!password) {
      passwordError = "password is required, minimum 2 characters";
    }
    if (!email) {
      emailError = "email is required, minimum 2 characters";
    }

    if (passwordError || emailError) {
      setInputError((curr) => {
        return {
          ...curr,
          password: passwordError,
          email: emailError,
        };
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const checkValidate = validate();
    if (checkValidate) {
      setInputError({});
      setLoading(true);
      try {
        const data = {
          email,
          password,
        };
        const res = await login(data);

        setLoading(false);
        dispatch(userLoginSuccess(res.data));
        toast.success("Login successfully");
        navigate("/account");
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

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="signin">
      <HeaderImg title="My Account" />

      <div className="signin__wrapper">
        <h2>Login</h2>

        <div className="signin__main">
          <div className="signin__main__inputCon">
            <Label htmlFor="email">
              {" "}
              Email address <span>*</span>
            </Label>
            <Input
              id="email"
              type="text"
              error={inputError.email ? true : false}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signin__main__inputCon">
            <Label htmlFor="password">
              {" "}
              Password <span>*</span>
            </Label>
            <Input
              id="password"
              type="password"
              error={inputError.password ? true : false}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/forgot-password">
            <span className="signin__main__lost">Lost your password?</span>
          </Link>
          <br />

          <button className="btn" onClick={handleLogin}>
            {loading ? <Loading button={true} /> : "Login"}
          </button>
          <p>
            Don't have an account{" "}
            <Link style={{ color: "#337ab7" }} to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
