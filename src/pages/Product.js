import React, { useContext, useEffect, useState } from "react";
import ProductItemCard from "../components/ProductItemCard";
import { useParams } from "react-router-dom";
import { Context } from "../context/MainContext";
import {
  addToCart,
  productFetchSuccess,
  productsFetchSuccess,
} from "../context/Action";
import { toast } from "react-toastify";
import { fetchProduct, fetchProductsBycategory } from "../api/usersApi";
import placeholder from "../assets/images/product-placeholder.png";
import Loading from "../components/Loading";

const Product = () => {
  const { dispatch, products, product, cart } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [loadingRel, setLoadingRel] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [stock, setStock] = useState(0);
  const [amount, setAmount] = useState(1);

  const [step, setStep] = useState(1);
  const { id } = useParams();

  const formattingOption = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const handleChange = (value) => {
    if (value <= product.stock && value > 0) {
      setAmount(value);
    } else if (value > product.stock) {
      setAmount(product.stock);
    } else {
      setAmount(1);
    }
  };

  const handleAddtoCart = () => {
    if (!cart) {
      let newProduct = product;
      product.quantity = amount;

      dispatch(addToCart([newProduct]));
      toast.success("Added to cart");
    } else {
      let cartToUpdate = cart;
      const index = cartToUpdate.findIndex(
        (item) => item?._id === product?._id
      );
      if (index >= 0) {
        if (cartToUpdate[index].quantity < cartToUpdate[index].stock) {
          if (
            amount <=
            cartToUpdate[index].stock - cartToUpdate[index].quantity
          ) {
            cartToUpdate[index].quantity =
              cartToUpdate[index].quantity + amount;
            dispatch(addToCart(cartToUpdate));
            toast.success("Added to cart");
          } else {
            cartToUpdate[index].quantity =
              cartToUpdate[index].quantity +
              (cartToUpdate[index].stock - cartToUpdate[index].quantity);
            dispatch(addToCart(cartToUpdate));
            toast.success("Added to cart");
          }
        } else {
          toast.warning("Already in cart, no more product to add");
        }
      } else {
        let newProduct = product;
        product.quantity = amount;

        cartToUpdate = [...cart, newProduct];
        dispatch(addToCart(cartToUpdate));
        toast.success("Added to cart");
      }
    }
  };

  useEffect(() => {
    const handleFetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetchProduct(id);
        dispatch(productFetchSuccess(res.data));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    };
    handleFetchProduct();
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.stock) {
      setStock(product.stock);
    }
  }, [product, product?.stock]);

  useEffect(() => {
    const handleFetchProducts = async () => {
      if (product?.category) {
        setLoadingRel(true);
        try {
          const res = await fetchProductsBycategory(1, product?.category);
          dispatch(productsFetchSuccess(res.data));
          setLoadingRel(false);
        } catch (err) {
          setLoadingRel(false);
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          toast.error(message);
        }
      }
    };

    handleFetchProducts();
  }, [dispatch, product?.category, product]);

  useEffect(() => {
    if (products) {
      const newRelatedProducts = products?.products?.filter(
        (currProduct) => currProduct?._id !== product?._id
      );
      newRelatedProducts.splice(4);

      setRelatedProduct(newRelatedProducts);
    }
  }, [products, product?._id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="product">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="product__main">
            <div className="product__main__imgCon">
              <img src={product?.img ? product?.img : placeholder} alt="" />
            </div>

            <div className="product__main__right">
              <h2>{product?.name}</h2>

              <span className="product__main__right__line"></span>

              <div className="product__main__right__price">
                <span>
                  {product?.oldPrice?.toLocaleString("en-US", formattingOption)}
                </span>
                <p>
                  {product?.price?.toLocaleString("en-US", formattingOption)}
                </p>
              </div>

              {stock > 0 ? (
                <div className="product__main__right__add">
                  <span>{stock} in stock</span>
                  <div className="product__main__right__add__main">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <button className="btn" onClick={handleAddtoCart}>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ) : (
                <div className="product__main__right__add">
                  <p>Out of Stock</p>
                </div>
              )}
            </div>
          </div>

          <div className="product__info">
            <div className="product__info__header">
              <div
                className={
                  step === 1
                    ? "product__info__header__item active"
                    : "product__info__header__item"
                }
                onClick={() => setStep(1)}
              >
                Description
              </div>
              {product?.weight && (
                <div
                  onClick={() => setStep(2)}
                  className={
                    step === 2
                      ? "product__info__header__item active"
                      : "product__info__header__item"
                  }
                >
                  Additional information
                </div>
              )}
              {/* <div className="product__info__header__item">Review()</div> */}
            </div>

            {step === 1 && (
              <div className="product__info__main">
                <h4>Description</h4>
                <p className="product__info__main__disc">
                  {product?.discription}
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="product__info__main">
                <h4>Additional information</h4>
                <div className="product__info__main__ai">
                  <p>Weight</p>
                  <span>{product?.weight}kg</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="product__related">
        <h4 className="shop__left__header">RELATED PRODUCTS</h4>
        {loadingRel ? (
          <Loading />
        ) : (
          <div className="shop__right__products">
            {relatedProduct?.map((product, i) => {
              return <ProductItemCard key={i} product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
