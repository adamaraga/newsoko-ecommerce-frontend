import { useEffect, useState } from "react";
import anchorIcon from "../assets/images/svg/anchor.svg";
import ProductItemCard from "./ProductItemCard";
import { fetchProductsByWholeSale } from "../api/usersApi";
import { toast } from "react-toastify";
import Loading from "./Loading";

const WholeSale = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const handleMessageCount = async () => {
      setLoading(true);
      try {
        const res = await fetchProductsByWholeSale(1);
        setProducts(res.data);
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
  }, []);

  return (
    <section className="featured" style={{ background: "#EFEFEF" }}>
      <div className="featured__header">
        <h3>Wide range of brands in stock</h3>
        <h4>Wholesale Lots</h4>
        <img src={anchorIcon} alt="" className="featured__header__anchor" />
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

export default WholeSale;
