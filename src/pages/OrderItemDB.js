import { useContext, useEffect, useState } from "react";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { fetchOrder } from "../api/adminApi";
import Loading from "../components/Loading";

const OrderItemDB = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const formattingOption = {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  };

  const { id } = useParams();

  useEffect(() => {
    const handleFetchOrder = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const res = await fetchOrder(user?.accessToken, id);

          setOrder(res.data);
          setLoading(false);
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

    handleFetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.accessToken]);

  return (
    <div className="orderItemDB">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="checkout__right">
            <h2>Order Item</h2>

            <div className="cart__main__total" style={{ marginTop: 30 }}>
              <div className="cart__main__total__part">
                <b>Products</b>
              </div>
              {order?.products?.map((product) => {
                return (
                  <div key={product._id} className="cart__main__total__part">
                    <span>
                      {product?.name} <b>× {product?.quantity}</b>{" "}
                    </span>
                    {(product?.price * product?.quantity).toLocaleString(
                      "en-NG",
                      formattingOption
                    )}
                  </div>
                );
              })}

              <div className="cart__main__total__part">
                <b>Date</b>
                {order?.createdAt?.slice(0, 10)}
              </div>
              <div className="cart__main__total__part">
                <b>Order/Payment Id (Paypal)</b>
                {order?.paymentId}
              </div>
              <div className="cart__main__total__part">
                <b>Payment Status</b>
                {order?.paymentStatus}
              </div>
              <div className="cart__main__total__part">
                <b>User Id</b>
                {order?.userId}
              </div>
              <div className="cart__main__total__part">
                <b>orderNote</b>
                {order?.orderNote}
              </div>
              <div className="cart__main__total__part">
                <b>Shipping Method</b>
                {order?.shippingMethod}
              </div>
              <div className="cart__main__total__part">
                <b>Shipping Amount</b>
                {order?.shippingAmount?.toLocaleString(
                  "en-NG",
                  formattingOption
                )}
              </div>

              <div className="cart__main__total__part">
                <b>Total</b>
                <b>{order?.bill?.toLocaleString("en-NG", formattingOption)}</b>
              </div>
            </div>
          </div>

          <div className="checkout__right" style={{ marginTop: 50 }}>
            <h3>Shipping details</h3>

            <div className="cart__main__total" style={{ margin: "30px 0" }}>
              <div className="cart__main__total__part">
                <b>User Id</b>
                {order?.billingAddress?.userId}
              </div>
              <div className="cart__main__total__part">
                <b>First name</b>
                {order?.billingAddress?.firstName}
              </div>
              <div className="cart__main__total__part">
                <b>Last name</b>
                {order?.billingAddress?.lastName}
              </div>
              <div className="cart__main__total__part">
                <b>Company name </b>
                {order?.billingAddress?.companyName}
              </div>
              <div className="cart__main__total__part">
                <b>Country</b>
                {order?.billingAddress?.country}
              </div>
              <div className="cart__main__total__part">
                <b>Street address</b>
                {order?.billingAddress?.streetAddress}
              </div>

              <div className="cart__main__total__part">
                <b>Street address 2</b>
                {order?.billingAddress?.streetAddressOpt}
              </div>
              <div className="cart__main__total__part">
                <b>Town / City</b>
                {order?.billingAddress?.city}
              </div>
              <div className="cart__main__total__part">
                <b>State</b>
                {order?.billingAddress?.state}
              </div>
              <div className="cart__main__total__part">
                <b>ZIP Code</b>
                {order?.billingAddress?.zipCode}
              </div>
              <div className="cart__main__total__part">
                <b>Phone</b>
                {order?.billingAddress?.phone}
              </div>
              <div className="cart__main__total__part">
                <b>Email address</b>
                {order?.billingAddress?.email}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderItemDB;
