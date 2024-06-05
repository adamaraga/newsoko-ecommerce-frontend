import React, { useContext, useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import { updateCart, updateShippingDetails } from "../context/Action";
import CartItem from "../components/CartItem";
import { countryList } from "../assets/data/countries";

const Cart = () => {
  const { cart, dispatch } = useContext(Context);
  const [cartMain, setCartMain] = useState(null);
  const [method, setMethod] = useState("fedex");
  const [methodAmount, setMethodAmount] = useState(35);
  const [total, setTotal] = useState(0);
  const [cartUpdated, setcartUpdated] = useState(false);
  const [country, setCountry] = useState("United States");

  const formattingOption = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const handleRemoveFromCart = (id) => {
    const newCart = cartMain.filter((product) => product._id !== id);
    dispatch(updateCart(newCart));
  };

  const handleProceed = () => {
    const shippingdetails = {
      country,
      methodAmount,
      method,
    };

    dispatch(updateShippingDetails(shippingdetails));
    dispatch(updateCart(cartMain));
  };

  useEffect(() => {
    setCartMain(cart);
  }, [cart, cart.length]);

  useEffect(() => {
    if (cartMain) {
      let newTotal = 0;
      cartMain.forEach((product) => {
        newTotal += product.price * product.quantity;
      });

      setTotal(newTotal);
    }
  }, [cartMain, cartMain?.length, cartUpdated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart">
      <HeaderImg title="Cart" />

      <div className="cart__wrapper">
        <div className="cart__main">
          <div className="cart__main__product">
            {cartMain?.map((product, i) => {
              return (
                <CartItem
                  key={product._id}
                  product={product}
                  handleRemoveFromCart={handleRemoveFromCart}
                  setCartMain={setCartMain}
                  setcartUpdated={setcartUpdated}
                  index={i}
                  cartMain={cartMain}
                />
              );
            })}
          </div>

          <h2 className="cart__main__total__title">Cart totals</h2>
          <div className="cart__main__total">
            <div className="cart__main__total__part">
              <b>Subtotal:</b> {total.toLocaleString("en-US", formattingOption)}
            </div>
            <div className="cart__main__total__part shipping">
              <b>Shipping:</b>{" "}
              <div className="cart__main__total__part__inputs">
                {country !== "United States" && (
                  <div className="cart__main__total__part__inputs__item">
                    International Flat Rate: $1,000.00
                  </div>
                )}

                {country === "United States" && (
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
                )}
                <br />
                <div className="cart__main__total__part__inputs__info">
                  Shipping to <b>{country}</b>
                </div>

                <div className="cart__main__total__part__inputs__change">
                  Change Country <br />
                  <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countryList.map((country, i) => {
                      return (
                        <option key={i} value={country.name}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="cart__main__total__part">
              <b>Total:</b>{" "}
              {country !== "United States"
                ? (total + 1000).toLocaleString("en-US", formattingOption)
                : (total + methodAmount).toLocaleString(
                    "en-US",
                    formattingOption
                  )}
            </div>
          </div>

          <div className="cart__main__btn">
            <Link to="/checkout" onClick={handleProceed}>
              <button>Proceed to checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
