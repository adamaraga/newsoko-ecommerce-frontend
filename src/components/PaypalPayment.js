import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useContext } from "react";
import { Context } from "../context/MainContext";
import Loading from "./Loading";
import { PaymentApproved } from "../api/usersApi";
import { toast } from "react-toastify";

const PaypalPayment = ({ loading, proceedPayment, handleInitPayment }) => {
  const { orderId } = useContext(Context);
  const navigate = useNavigate();

  function createOrder() {
    return orderId.orderId;
  }
  const onApprove = async (data) => {
    try {
      await PaymentApproved(data.orderID);

      toast.success("Payment successfully, Order Processing");
      navigate("/");
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      toast.error(message);
    }
  };

  return (
    <div className="paypalPayment">
      <div className="paypalPayment__header">
        <h4>PayPal</h4>
        <img
          src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
          alt=""
        />
        <a href="https://www.paypal.com/us/webapps/mpp/paypal-popup">
          What is PayPal?
        </a>
      </div>

      <div className="paypalPayment__info">
        Pay via PayPal; you can pay with your credit card if you don’t have a
        PayPal account.
      </div>

      <div className="paypalPayment__info2">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our <Link to="/privacy-policy">privacy policy</Link>.
      </div>

      <div className="paypalPayment__btnCon">
        {proceedPayment ? (
          <div style={{ width: 250 }}>
            <PayPalScriptProvider
              options={{
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                components: "buttons",
                currency: "USD",
              }}
            >
              <PayPalButtons
                fundingSource="paypal"
                onApprove={onApprove}
                createOrder={createOrder}
              />
            </PayPalScriptProvider>
          </div>
        ) : (
          <button
            className="paypalPayment__btnCon__btn"
            onClick={handleInitPayment}
          >
            {loading ? <Loading button={true} /> : "Initiate Payment"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaypalPayment;
