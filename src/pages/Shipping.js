import { useEffect } from "react";
import HeaderImg from "../components/HeaderImg";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shipping">
      <HeaderImg title="Shipping" />

      <div className="about__main">
        <p>
          <b>Shipping:</b>
        </p>
        <p>
          <b>NOTE:</b> Shipping options are displayed in your cart after you
          enter your delivery address.
        </p>
        <p>Standard Processing & Shipping – $8.95 covers up to 5 pounds!</p>
        <p>
          Speed, tracking, insurance and convenience! Standard shipments may be
          made by either U.S. Mail or UPS Ground. Transit time is 4 to 8 days
          depending on your location.
        </p>
        <p>Expedited Processing & Shipping</p>
        <p>
          We offer FedEx Next Business Day Air and Second Business Day Air
          shipping options. During checkout you will be quoted a specific
          delivery day to help you choose which service meets your needs.
        </p>
        <p>
          Flat Rate Freight: $225 – To East Coast US States; all other contact
          us for shipping quote prior to placing order.
        </p>
        <p>
          <b>INTERNATIONAL SHIPPING:</b>
        </p>
        <p>
          We sell and ship to customers worldwide; shipping is at buyer’s full
          expense. International buyers are responsible for compliance to import
          laws, taxes, levies, and custom duties in their country.
          Dealsmarineparts.com complies with US Export regulation & restriction
          when applicable.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
