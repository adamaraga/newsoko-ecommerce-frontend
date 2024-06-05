import anchorIcon from "../assets/images/svg/anchor.svg";
import ProductItemCard from "./ProductItemCard";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../context/MainContext";
import { productsFetchSuccess } from "../context/Action";
import {
  fetchProducts,
  fetchProductsByBestSeller,
  fetchProductsBycategory,
} from "../api/usersApi";
import Loading from "./Loading";

const Featured = () => {
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState(1);
  const { dispatch, products } = useContext(Context);

  const typeBtns = ["LATEST PRODUCTS", "BEST SELLERS", "ACCESSORIES"];
  useEffect(() => {
    const handleMessageCount = async () => {
      setLoading(true);
      try {
        const fetch =
          productType === 1
            ? fetchProducts(1)
            : productType === 2
            ? fetchProductsByBestSeller(1)
            : fetchProductsBycategory("Accessories", 2);
        const res = await fetch;
        dispatch(productsFetchSuccess(res.data));
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

    handleMessageCount();
  }, [dispatch, productType]);

  return (
    <section className="featured">
      <div className="featured__header">
        <h3>Wide range of brands in stock</h3>
        <h4>Featured Products</h4>
        <img src={anchorIcon} alt="" className="featured__header__anchor" />
      </div>

      <div className="featured__main">
        <div className="featured__main__btn">
          {typeBtns?.map((type, i) => {
            return (
              <button
                key={type}
                className={
                  productType === i + 1
                    ? "featured__main__btn__item active"
                    : "featured__main__btn__item"
                }
                onClick={() => setProductType(i + 1)}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="featured__main__products">
          {products?.products?.map((product) => {
            return <ProductItemCard key={product._id} product={product} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Featured;
