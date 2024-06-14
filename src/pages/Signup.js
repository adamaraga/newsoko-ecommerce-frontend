import React, { useContext, useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import { Input, Label } from "../components/styledComponent/formInputs";
import { signup } from "../api/usersApi";
import Loading from "../components/Loading";
import mailIcon from "../assets/images/svg/mail.svg";

const Signup = () => {
  const { user } = useContext(Context);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";

    if (!firstName) {
      firstNameError = "first name is required, minimum 2 characters";
    }
    if (!lastName) {
      lastNameError = "last name is required, minimum 2 characters";
    }
    if (!password) {
      passwordError = "password is required, minimum 2 characters";
    }
    if (!email) {
      emailError = "email is required, minimum 2 characters";
    }

    if (passwordError || emailError || lastNameError || firstNameError) {
      setInputError((curr) => {
        return {
          ...curr,
          password: passwordError,
          email: emailError,
          lastName: lastNameError,
          firstName: firstNameError,
        };
      });
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    const checkValidate = validate();
    if (checkValidate) {
      setInputError({});
      setLoading(true);
      try {
        const data = {
          email,
          password,
          firstName,
          lastName,
        };

        await signup(data);

        setLoading(false);
        toast.success("Signup successfully");
        setStep(2);
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

      {step === 1 && (
        <div className="signin__wrapper">
          <h2>Sign up</h2>

          <div className="signin__main">
            <div className="signin__main__inputCon">
              <Label htmlFor="firstname">
                {" "}
                First Name <span>*</span>
              </Label>
              <Input
                id="firstname"
                type="text"
                error={inputError.firstName ? true : false}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="signin__main__inputCon">
              <Label htmlFor="lastname">
                {" "}
                Last Name <span>*</span>
              </Label>
              <Input
                id="lastname"
                type="text"
                error={inputError.lastName ? true : false}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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

            <button className="btn" onClick={handleSignup}>
              {loading ? <Loading button={true} /> : "Sign up"}
            </button>
            <p>
              Already have an account{" "}
              <Link style={{ color: "#337ab7" }} to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="signin__wrapper">
          <img src={mailIcon} alt="mail" style={{ width: 80 }} />
          <h2>Verify Your Email Address</h2>
          <p>
            An email has been sent to your inbox, follow the instructions to
            Verify your email address and login.
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;
