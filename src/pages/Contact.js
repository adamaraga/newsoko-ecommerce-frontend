import React, { useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import {
  Input,
  Label,
  Textarea,
} from "../components/styledComponent/formInputs";
import { toast } from "react-toastify";
import { sendMessage } from "../api/usersApi";
import Loading from "../components/Loading";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState({});

  const validate = () => {
    let nameError = "";
    let messageError = "";
    let emailError = "";

    if (name.length < 2) {
      nameError = "name is required, minimum 2 characters";
    }
    if (message.length < 2) {
      messageError = "message is required, minimum 2 characters";
    }
    if (email.length < 2) {
      emailError = "email is required, minimum 2 characters";
    }

    if (nameError || messageError || emailError) {
      setInputError((curr) => {
        return {
          ...curr,
          name: nameError,
          message: messageError,
          email: emailError,
        };
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const checkValidate = validate();
    setInputError({});

    if (checkValidate) {
      setLoading(true);
      try {
        const data = {
          name,
          message,
          email,
        };
        await sendMessage(data);

        setLoading(false);
        setName("");
        setEmail("");
        setMessage("");
        toast.success("Message sent successfully");
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact">
      <HeaderImg title="Contact Us" />

      <div className="contact__mainCon">
        <div className="contact__main">
          <div className="contact__left">
            <p>
              <b>Mail:</b>
              <br />
            </p>
            <p>
              Newsoko Nigeria, <br />
              Isolo Mushin Lagos <br />
              Olubi Str, <br />
              22a
            </p>
            <br />

            <p>
              <b> Email:</b>
              <br />
            </p>
            <p>
              <a style={{ color: "#337ab7" }} href="mailto:info@newsoko.com.ng">
                info@newsoko.com.ng
              </a>
            </p>
            <br />

            {/* <p>
              <b>Telephone:</b>
            </p> */}
            {/* <p>
              <b>Toll free:</b>
              +1(800)211-0479
            </p>
            <p>
              <b>Local:</b>
              +1(757)391-4366
            </p> */}
          </div>
          <div className="contact__right">
            <div className="">
              <Label htmlFor="name">
                {" "}
                Name <span>*</span>
              </Label>
              <Input
                id="name"
                value={name}
                type="text"
                error={inputError.name ? true : false}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <Label htmlFor="email">
                {" "}
                Email <span>*</span>
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                error={inputError.email ? true : false}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <Label htmlFor="message">
                {" "}
                Message <span>*</span>
              </Label>
              <Textarea
                name="message"
                id="message"
                rows="7"
                value={message}
                error={inputError.message ? true : false}
                onChange={(e) => setMessage(e.target.value)}
              ></Textarea>
            </div>

            <button className="contact__right__btn" onClick={handleSubmit}>
              {loading ? <Loading button={true} /> : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
