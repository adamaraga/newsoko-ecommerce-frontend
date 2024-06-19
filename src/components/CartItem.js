import { Link } from "react-router-dom";
import placeholder from "../assets/images/product-placeholder.png";
import { useEffect, useState } from "react";

const CartItem = ({
  product,
  handleRemoveFromCart,
  setCartMain,
  setcartUpdated,
  index,
  cartMain,
}) => {
  const [quantity, setQuantity] = useState(1);

  const formattingOption = {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  };

  const handleChange = (value) => {
    const stock = product.stock;
    let currQuantity = 1;

    if (value <= stock && value > 0) {
      currQuantity = value;
    } else if (value > stock) {
      currQuantity = stock;
    } else {
      currQuantity = 1;
    }

    setQuantity(currQuantity);
    const newCart = cartMain;

    newCart[index].quantity = currQuantity;

    setCartMain(newCart);
    setcartUpdated((curr) => !curr);
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product?.quantity]);

  return (
    <div className="cart__main__product__item">
      <div className="cart__main__product__item__part">
        <span
          onClick={() => handleRemoveFromCart(product._id)}
          className="cart__main__product__item__part__remove"
        >
          x
        </span>
      </div>
      <div className="cart__main__product__item__part">
        <b>Product:</b>{" "}
        <Link to={"/product/" + product._id}>{product.name}</Link>
      </div>
      <div className="cart__main__product__item__part">
        <b>Image:</b>{" "}
        <img src={product.img ? product.img : placeholder} alt="" />
      </div>
      <div className="cart__main__product__item__part">
        <b>Price:</b> {product?.price.toLocaleString("en-NG", formattingOption)}
      </div>
      <div className="cart__main__product__item__part">
        <b>Stock:</b> {product?.stock}
      </div>
      <div className="cart__main__product__item__part">
        <b>Quantity:</b>{" "}
        <input
          type="number"
          value={quantity}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="cart__main__product__item__part">
        <b>Subtotal:</b>{" "}
        {(product?.price * quantity).toLocaleString("en-NG", formattingOption)}
      </div>
    </div>
  );
};

export default CartItem;
