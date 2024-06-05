import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import cartIcon from "../assets/images/svg/cart.svg";
import placeholder from "../assets/images/product-placeholder.png";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import { updateCart } from "../context/Action";

const CartModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const { cart, dispatch } = useContext(Context);

  const formattingOption = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const handleRemoveFromCart = (id) => {
    const newCart = cart.filter((product) => product._id !== id);
    dispatch(updateCart(newCart));
  };

  useEffect(() => {
    if (cart) {
      let newTotal = 0;
      cart.forEach((product) => {
        newTotal += product.price * product.quantity;
      });

      setTotal(newTotal);
    }
  }, [cart?.length, cart]);

  return (
    <div className="cartModal">
      <div className="topbar__top__cartCon">
        <img src={cartIcon} alt="" onClick={() => setModalIsOpen(true)} />
        <span>{cart ? cart.length : 0}</span>
      </div>

      <Modal
        className="modalMain"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Cart Modal"
      >
        <div className="cartModal__main">
          <div
            className="cartModal__main__close"
            onClick={() => setModalIsOpen(false)}
          >
            x
          </div>

          {cart.length > 0 ? (
            <>
              <div className="cartModal__main__list">
                {cart?.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className="cartModal__main__list__item"
                    >
                      <img
                        src={
                          product.img
                            ? process.env.REACT_APP_API_URL + "/" + product.img
                            : placeholder
                        }
                        alt=""
                        className="cartModal__main__list__item__img"
                      />

                      <div className="cartModal__main__list__item__info">
                        <p>
                          {product.name} <br /> <br />
                          {product.quantity} x{" "}
                          {product.price.toLocaleString(
                            "en-US",
                            formattingOption
                          )}
                        </p>
                      </div>

                      <div className="cartModal__main__list__item__remove">
                        <span onClick={() => handleRemoveFromCart(product._id)}>
                          x
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cartModal__main__subtotal">
                Subtotal: {total.toLocaleString("en-US", formattingOption)}
              </div>

              <div
                className="cartModal__main__btn"
                onClick={() => setModalIsOpen(false)}
              >
                <Link to="/cart">
                  <button className="cartModal__main__btn__item">
                    VIEW CART
                  </button>
                </Link>
                <Link to="/checkout">
                  <button className="cartModal__main__btn__item alt">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div>No item in cart</div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CartModal;
