import React, { useContext } from "react";
import placeholder from "../assets/images/product-placeholder.png";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import { addToCart } from "../context/Action";
import { toast } from "react-toastify";

const ProductItemCard = ({ product }) => {
  const { dispatch, cart } = useContext(Context);

  const formattingOption = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  // const handleAddtoCart =async(product)=> {
  //   if(user?.id) {
  //     setLoading(true);
  //     try {
  //       const data = {
  //         userId: user.id,
  //         product: {
  //           productId: product._id,
  //           quantity: product.quantity,
  //           price: { type: Number, required: true },
  //         },
  //       };
  //       const res = await addToUserCart(data);

  //       setLoading(false);
  //       dispatch(userLoginSuccess(res.data));
  //       toast.success("Login successfully");
  //       navigate("/account");
  //     } catch (err) {
  //       setLoading(false);
  //       const message =
  //         (err.response && err.response.data && err.response.data.message) ||
  //         err.message ||
  //         err.toString();
  //       toast.error(message);
  //     }
  //   }

  // }

  const handleAddtoCartInit = () => {
    if (!cart) {
      let newProduct = product;
      product.quantity = 1;

      dispatch(addToCart([newProduct]));
      toast.success("Added to cart");
    } else {
      let cartToUpdate = cart;
      const index = cartToUpdate.findIndex((item) => item._id === product._id);
      if (index >= 0) {
        if (cartToUpdate[index].quantity < cartToUpdate[index].stock) {
          cartToUpdate[index].quantity = cartToUpdate[index].quantity + 1;
          dispatch(addToCart(cartToUpdate));
          toast.success("Added to cart");
        } else {
          toast.warning("Already in cart, no more product to add");
        }
      } else {
        let newProduct = product;
        product.quantity = 1;

        cartToUpdate = [...cart, newProduct];
        dispatch(addToCart(cartToUpdate));
        toast.success("Added to cart");
      }
    }
  };

  return (
    <div className="featured__main__products__item">
      <div className="featured__main__products__item__imgCon">
        <img
          src={
            product.img
              ? process.env.REACT_APP_API_URL + "/" + product.img
              : placeholder
          }
          alt=""
        />

        {product.stock === 0 && <p>OUT OF STOCK</p>}
      </div>

      <Link to={"/product/" + product._id}>
        <p className="featured__main__products__item__disc">{product.name}</p>
      </Link>
      <div className="featured__main__products__item__price">
        {product.oldPrice && (
          <span>
            {product?.oldPrice.toLocaleString("en-US", formattingOption)}
          </span>
        )}
        <p>{product?.price.toLocaleString("en-US", formattingOption)}</p>
      </div>

      {product.stock === 0 ? (
        <Link to={"/product/2132"}>
          <button className="btn">READ MORE</button>
        </Link>
      ) : (
        <button className="btn" onClick={handleAddtoCartInit}>
          ADD TO CART
        </button>
      )}
    </div>
  );
};

export default ProductItemCard;
