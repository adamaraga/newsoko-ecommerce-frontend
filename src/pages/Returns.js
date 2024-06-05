import React, { useEffect } from "react";
import HeaderImg from "../components/HeaderImg";

const Returns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="returns">
      <HeaderImg title="Returns" />

      <div className="about__main">
        <p>
          <b>New Product Return Conditions</b>
        </p>
        <p>
          Parts must be returned with the original packaging intact, suitable
          for restocking as new.
        </p>
        <p>We cannot accept returns for items …</p>
        <ul>
          <li>
            if the product packaging is torn open or the original packaging is
            damaged or incomplete.
          </li>
          <li>
            if the product has been used, installed or altered in any way.
          </li>
          <li>
            if more than 30 days have elapsed since the order was shipped.
          </li>
          <li>
            if the product is a special order item that we do not normally stock
            in our warehouse.
          </li>
        </ul>

        <p>
          <b>New Product Return Procedure & Processing</b>
        </p>

        <ol>
          <li>
            Please request a return authorization using the form at the bottom
            of this page or by calling 1(800)211-0479. We will email return
            instructions to you within 24 hours during weekdays.
          </li>
          <li>
            Return products securely packaged by UPS or US mail according to the
            instructions you receive. It is always best to use a traceable
            shipping method or one that offers delivery confirmation.
          </li>
          <li>
            com will issue a refund for the purchase price of the items meeting
            the return conditions listed above. Original and return shipping
            charges are non-refundable.
          </li>
        </ol>
        <p>
          <b>Please Note:</b>
          Once we receive your return, it can take 7-10 business days to
          complete the return process and issue a refund.
        </p>

        <p>
          <b>Warranty Claim Return Procedure</b>
        </p>

        <ol>
          <li>
            Please request a return authorization using the form at the bottom
            of this page or by calling (800) 211-0479. We will email return
            instructions to you within 24 hours during weekdays.
          </li>
          <li>
            Return products securely packaged by FedEx, UPS or US mail according
            to the instructions you receive. It is always best to use a
            traceable shipping method or one that offers delivery confirmation.
          </li>
          <li>
            Once we receive the product we will then return the product to the
            manufacturer for warranty evaluation.
          </li>
          <li>
            The manufacturer will inspect the product and make a warranty
            approval if appropriate, then notify dealsmarineparts.com.
          </li>
          <li>
            Dealsmarineparts.com will then refund your purchase price for the
            item. Original and return shipping charges are non-refundable.
          </li>
        </ol>

        <p>
          <b>PLEASE NOTE: </b> Warranty claim evaluation times vary by
          manufacturer. Once we receive your return it can take 4-6 weeks to
          complete the evaluation process and issue a refund.
        </p>
        <p>
          <b>–Replacement: </b>
          When available with customer’s approval Dealsmarineparts.com will
          provide replacement for defective products.
        </p>

        <p>
          -Refund: Refunds for the purchase price of products will be made by
          the same method used to pay for the order. We will refund your
          credit/debit card account, PayPal account or send you a refund check
          accordingly. The cost of return shipping is the customer’s
          responsibility. Original shipping charges are non-refundable. When a
          refund is issued we will contact you by email to let you know the
          refund has been made. *PayPal does not refund fees collected,
          therefore, all PayPal payment refunds will NOT include fees collected
          by PayPal.
        </p>
      </div>
    </div>
  );
};

export default Returns;
