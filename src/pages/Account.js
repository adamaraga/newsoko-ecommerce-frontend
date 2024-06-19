import React, { useContext, useEffect, useState } from "react";
import HeaderImg from "../components/HeaderImg";
import { Context } from "../context/MainContext";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "../context/Action";
import { toast } from "react-toastify";
import { fetchUserOrder } from "../api/usersApi";
import Loading from "../components/Loading";

const Account = () => {
  const { user, dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const formattingOption = {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  };

  const handleLogout = () => {
    localStorage.removeItem("sokoUser");
    dispatch(userLogOut());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleMessageCount = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const res = await fetchUserOrder(user?.id, user?.accessToken);

          setOrders(res.data);
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

    handleMessageCount();
  }, [dispatch, user?.id, user?.accessToken]);

  return (
    <div className="account">
      <HeaderImg title="Account" />

      <div className="account__main">
        <div className="account__main__details">
          <h3>Account Details</h3>
          <div className="account__main__details__info">
            <div className="account__main__details__info__item">
              First Name: <span>{user?.firstName}</span>
            </div>
            <div className="account__main__details__info__item">
              Last Name: <span>{user?.lastName}</span>
            </div>
            <div className="account__main__details__info__item">
              Email: <span>{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="account__main__logout">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="account__main__order">
          <h3>Order History</h3>

          <div className="account__main__order__table">
            <div className="account__main__order__table__body">
              <div className="account__main__order__table__row head">
                <div
                  style={{ width: "150px" }}
                  className="account__main__order__table__row__head"
                >
                  Order ID
                </div>
                <div
                  style={{ width: "100px" }}
                  className="account__main__order__table__row__head"
                >
                  Date / time
                </div>
                <div
                  style={{ width: "120px" }}
                  className="account__main__order__table__row__head"
                >
                  Order/Payment Id (Paypal)
                </div>
                <div
                  style={{ width: "120px" }}
                  className="account__main__order__table__row__head"
                >
                  Payment Status
                </div>
                <div
                  style={{ width: "100px" }}
                  className="account__main__order__table__row__head"
                >
                  Order Status
                </div>
                <div
                  style={{ width: "100px" }}
                  className="account__main__order__table__row__head"
                >
                  Total Amount
                </div>
              </div>

              {loading ? (
                <Loading />
              ) : (
                orders.map((order) => {
                  return (
                    <div
                      key={order._id}
                      className="account__main__order__table__row"
                    >
                      <div
                        style={{ width: "150px" }}
                        className="account__main__order__table__row__data"
                      >
                        {order?._id}
                      </div>
                      <div
                        style={{ width: "100px" }}
                        className="account__main__order__table__row__data"
                      >
                        <div className="account__main__order__table__row__data__disc">
                          <h4>{order?.createdAt?.slice(0, 10)}</h4>
                        </div>
                      </div>
                      <div
                        style={{ width: "120px" }}
                        className="account__main__order__table__row__data"
                      >
                        {order?.paymentId}
                      </div>
                      <div
                        style={{ width: "120px" }}
                        className="account__main__order__table__row__data"
                      >
                        {order?.paymentStatus}
                      </div>
                      <div
                        style={{ width: "100px" }}
                        className="account__main__order__table__row__head"
                      >
                        {order?.paymentStatus === "Initiated"
                          ? "Pending"
                          : "Processing"}
                      </div>
                      <div
                        style={{ width: "100px" }}
                        className="account__main__order__table__row__data"
                      >
                        {order?.bill.toLocaleString("en-NG", formattingOption)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
