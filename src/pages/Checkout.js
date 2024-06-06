import { useContext, useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import {
  Input,
  Label,
  Select,
  Textarea,
} from "../components/styledComponent/formInputs";
import { countryList } from "../assets/data/countries";
import PaypalPayment from "../components/PaypalPayment";
import { Context } from "../context/MainContext";
import { initPayment } from "../api/usersApi";
import { toast } from "react-toastify";
import { orderIdFetchSuccess } from "../context/Action";

const Checkout = () => {
  const [states, setStates] = useState([]);
  const { cart, dispatch, shippingDetails, user } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [method, setMethod] = useState(
    shippingDetails?.method ? shippingDetails?.method : "fedex"
  );
  const [methodAmount, setMethodAmount] = useState(
    shippingDetails?.methodAmount ? shippingDetails?.methodAmount : 35
  );
  const [country, setCountry] = useState(
    shippingDetails?.country ? shippingDetails?.country : "United States"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddressOpt, setStreetAddressOpt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [inputError, setInputError] = useState({});
  const [loading, setLoading] = useState(false);
  const [proceedPayment, setProceedPayment] = useState(false);

  const validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let countryError = "";
    let streetAddressError = "";
    let cityError = "";
    let stateError = "";
    let zipCodeError = "";
    let phoneError = "";
    let emailError = "";

    if (firstName.length < 2) {
      firstNameError = "first name is required, minimum 2 characters";
    }
    if (lastName.length < 2) {
      lastNameError = "last name is required, minimum 2 characters";
    }
    if (!country) {
      countryError = "country is required";
    }
    if (!streetAddress) {
      streetAddressError = "street address is required";
    }
    if (!city) {
      cityError = "city is required";
    }
    if (!state) {
      stateError = "state is required";
    }
    if (!zipCode) {
      zipCodeError = "zip code is required";
    }
    if (!phone) {
      phoneError = "phone is required";
    }
    if (!email) {
      emailError = "email is required";
    }

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      stateError ||
      phoneError ||
      cityError ||
      countryError ||
      zipCodeError ||
      streetAddressError
    ) {
      setInputError((curr) => {
        return {
          ...curr,
          firstName: firstNameError,
          lastName: lastNameError,
          email: emailError,
          state: stateError,
          phone: phoneError,
          city: cityError,
          country: countryError,
          zipCode: zipCodeError,
          streetAddress: streetAddressError,
        };
      });
      return false;
    }
    return true;
  };

  const formattingOption = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const handleCountryChange = (value) => {
    const newStates = countryList.filter((country) => country.name === value);

    setCountry(value);
    setStates(newStates?.[0]?.states);
  };

  const handleInitPayment = async () => {
    const checkValidate = validate();
    if (checkValidate) {
      setInputError({});
      setLoading(true);
      try {
        const orderProduct = cart?.map((product) => {
          return {
            productId: product._id,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
          };
        });
        const data = {
          address: {
            userId: user?.id ? user.id : null,
            firstName,
            lastName,
            companyName,
            country,
            streetAddress,
            streetAddressOpt,
            city,
            state,
            zipCode,
            phone,
            email,
            addresstype: "Both",
          },
          order: {
            userId: user?.id ? user.id : null,
            products: orderProduct,
            bill:
              country !== "United States"
                ? (total + 1000).toFixed(2)
                : (total + methodAmount).toFixed(2),
            orderNote,
            shippingMethod:
              country === "United States" ? methodAmount : "International",
            shippingAmount: country === "United States" ? methodAmount : 1000,
          },
        };
        const res = await initPayment(data);

        setLoading(false);
        dispatch(orderIdFetchSuccess(res.data));
        setProceedPayment(true);
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
    if (cart) {
      let newTotal = 0;
      cart.forEach((product) => {
        newTotal += product.price * product.quantity;
      });

      setTotal(newTotal);
    }
  }, [cart, cart?.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checkout">
      <HeaderImg title="Checkout" />

      <div className="checkout__main">
        <div className="checkout__left">
          <h2>Billing/Shipping details</h2>
          <form className="checkout__left__form">
            <div className="checkout__left__form__inputCon">
              <div className="checkout__left__form__inputCon__item">
                <Label htmlFor="firstName">
                  First name <span>*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  error={inputError.firstName ? true : false}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="checkout__left__form__inputCon__item">
                <Label htmlFor="lastName">
                  Last name <span>*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  error={inputError.lastName ? true : false}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="companyName">Company name (optional)</Label>
              <Input
                id="companyName"
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="Country">
                Country / Region <span>*</span>
              </Label>
              <Select
                id="Country"
                onChange={(e) => handleCountryChange(e.target.value)}
                value={country}
                error={inputError.country ? true : false}
              >
                <option value="">--</option>
                {countryList.map((country, i) => {
                  return (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="street">
                Street address <span>*</span>
              </Label>
              <Input
                id="street"
                type="text"
                error={inputError.streetAddress ? true : false}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="House number and street name"
              />
            </div>
            <div className="checkout__left__form__input">
              <Input
                id="streetOpt"
                type="text"
                onChange={(e) => setStreetAddressOpt(e.target.value)}
                placeholder="Apartment, suite, unit, etc. (optional)"
              />
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="City">
                Town / City <span>*</span>
              </Label>
              <Input
                id="City"
                type="text"
                error={inputError.city ? true : false}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="states">
                State <span>*</span>
              </Label>
              <Select
                id="states"
                onChange={(e) => setState(e.target.value)}
                error={inputError.state ? true : false}
              >
                <option value="">--</option>
                {states.map((state, i) => {
                  return (
                    <option key={i} value={state?.name}>
                      {state?.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="zip">
                ZIP Code <span>*</span>
              </Label>
              <Input
                id="zip"
                type="text"
                error={inputError.zipCode ? true : false}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="Phone">
                Phone <span>*</span>
              </Label>
              <Input
                id="Phone"
                type="number"
                error={inputError.phone ? true : false}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="checkout__left__form__input">
              <Label htmlFor="Email">
                Email address <span>*</span>
              </Label>
              <Input
                id="Email"
                type="text"
                error={inputError.email ? true : false}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="checkout__left__form__input">
              <Label htmlFor="NOTES">ORDER NOTES (OPTIONAL)</Label>
              <Textarea
                id="NOTES"
                placeholder="Notes about your order, e.g. special notes for delivery."
                rows={5}
                onChange={(e) => setOrderNote(e.target.value)}
              ></Textarea>
            </div>
          </form>
        </div>

        <div className="checkout__right">
          <h2>Your order</h2>

          <div className="cart__main__total" style={{ marginTop: 47 }}>
            <div className="cart__main__total__part">
              <b>Product</b>
              <b>Subtotal</b>
            </div>
            {cart?.map((product) => {
              return (
                <div key={product._id} className="cart__main__total__part">
                  <span>
                    {product?.name} <b>× {product?.quantity}</b>{" "}
                  </span>
                  {(product?.price * product?.quantity).toLocaleString(
                    "en-US",
                    formattingOption
                  )}
                </div>
              );
            })}

            <div className="cart__main__total__part">
              <b>Subtotal</b>
              <b>{total.toLocaleString("en-US", formattingOption)}</b>
            </div>
            <div className="cart__main__total__part">
              <b>Shipping</b>
              <div className="cart__main__total__part__inputs">
                {country === "United States" ? (
                  <>
                    <div className="cart__main__total__part__inputs__item">
                      <input
                        type="radio"
                        id="fedex"
                        value="fedex"
                        name="method"
                        checked={method === "fedex"}
                        onChange={(e) => {
                          setMethod(e.target.value);
                          setMethodAmount(35);
                        }}
                      />{" "}
                      <label htmlFor="fedex">Fedex Ground : $35.00</label>
                    </div>
                    <div className="cart__main__total__part__inputs__item">
                      <input
                        type="radio"
                        id="freight"
                        value="freight"
                        name="method"
                        checked={method === "freight"}
                        onChange={(e) => {
                          setMethod(e.target.value);
                          setMethodAmount(149);
                        }}
                      />{" "}
                      <label htmlFor="freight">Freight : $149.00</label>
                    </div>
                    <div className="cart__main__total__part__inputs__item">
                      <input
                        type="radio"
                        id="outboard"
                        value="outboard"
                        name="method"
                        checked={method === "outboard"}
                        onChange={(e) => {
                          setMethod(e.target.value);
                          setMethodAmount(425);
                        }}
                      />{" "}
                      <label htmlFor="outboard">
                        Freight outboards : $425.00
                      </label>
                    </div>
                  </>
                ) : (
                  <b style={{ textAlign: "end" }}>
                    International Flat Rate: <br />
                    {(1000).toLocaleString("en-US", formattingOption)}
                  </b>
                )}
              </div>
            </div>

            <div className="cart__main__total__part">
              <b>Total</b>

              <b>
                {country !== "United States"
                  ? (total + 1000).toLocaleString("en-US", formattingOption)
                  : (total + methodAmount).toLocaleString(
                      "en-US",
                      formattingOption
                    )}
              </b>
            </div>
          </div>

          {cart.length > 0 && (
            <PaypalPayment
              loading={loading}
              proceedPayment={proceedPayment}
              handleInitPayment={handleInitPayment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
