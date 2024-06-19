import React, { useEffect } from "react";
import HeaderImg from "../components/HeaderImg";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about">
      <HeaderImg title="Privacy Policy" />

      <div className="about__main">
        <p>
          <b>New Privacy Policy</b>
        </p>
        <p>
          <b>What information do we collect?</b>
        </p>
        <p>
          We collect information from you when you register on our site, place
          an order, subscribe to our newsletter, respond to a survey or fill out
          a form.
        </p>
        <p>
          When ordering or registering on our site, as appropriate, you may be
          asked to enter your: name, e-mail address, mailing address, phone
          number or credit card information. You may, however, visit our site
          anonymously.
        </p>
        <p>
          Google, as a third party vendor, uses cookies to track advertisments
          within and for our site. Users may opt out of the use of the DART
          cookie by visiting the Google ad and content network privacy policy.
        </p>

        <p>
          <b>What do we use your information for?</b>
        </p>
        <p>
          Any of the information we collect from you may be used in one of the
          following ways:
        </p>

        <p>
          <b>To improve our website</b>
        </p>
        <p>
          We continually strive to improve our website offerings based on the
          information and feedback we receive from you.
        </p>

        <p>
          <b>To improve customer service</b>
        </p>
        <p>
          Your information helps us to more effectively respond to your customer
          service requests and support needs.
        </p>

        <p>
          <b>To process transactions</b>
        </p>

        <p>
          Your information, whether public or private, will not be sold,
          exchanged, transferred, or given to any other company for any reason
          whatsoever, without your consent, other than for the express purpose
          of delivering the purchased product or service requested.
        </p>

        <p>
          <b>To send periodic emails</b>
        </p>

        <p>
          The email address you provide for order processing, will only be used
          to send you information, updates and inquiries pertaining to your
          order. If you decide to opt-in to our mailing list, you will receive
          emails that may include company news, updates, related product or
          service information, etc. Note: If at any time you would like to
          unsubscribe from receiving future emails, we include detailed
          unsubscribe instructions at the bottom of each email.
        </p>
        <p>
          <b>How do we protect your information?</b>
        </p>

        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information when you place an order or access your
          personal information.
        </p>
        <p>
          We offer the use of a secure server. All supplied sensitive/credit
          information is transmitted via Secure Socket Layer (SSL) technology
          and then encrypted into our Payment gateway providers database only to
          be accessible by those authorized with special access rights to such
          systems, and are required to keep the information confidential.
        </p>

        <p>
          After a transaction, your private information (credit cards, social
          security numbers, financials, etc.) will not be stored on our servers.
        </p>
        <p>
          <b>Do we use cookies?</b>
        </p>
        <p>
          Yes. Cookies are small files that a site or its service provider
          transfers to your computer’s hard drive through your Web browser (if
          you allow) that enables the sites or service providers systems to
          recognize your browser and capture and remember certain information.
        </p>
        <p>
          We use cookies to help us remember and process the items in your
          shopping cart and compile aggregate data about site traffic and site
          interaction so that we can offer better site experiences and tools in
          the future. We may contract with third-party service providers to
          assist us in better understanding our site visitors. These service
          providers are not permitted to use the information collected on our
          behalf except to help us conduct and improve our business.
        </p>
        <p>
          If you prefer, you can choose to have your computer warn you each time
          a cookie is being sent, or you can choose to turn off all cookies via
          your browser settings. Like most websites, if you turn your cookies
          off, some of our services may not function properly. However, you can
          still place orders over the telephone or by contacting customer
          service.
        </p>

        <p>
          <b>Do we disclose any information to outside parties?</b>
        </p>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information. This does not include trusted
          third parties who assist us in operating our website, conducting our
          business, or servicing you, so long as those parties agree to keep
          this information confidential. We may also release your information
          when we believe release is appropriate to comply with the law, enforce
          our site policies, or protect ours or others rights, property, or
          safety. However, non-personally identifiable visitor information may
          be provided to other parties for marketing, advertising, or other
          uses.
        </p>
        <p>
          <b>Third Party Links</b>
        </p>
        <p>
          Occasionally, at our discretion, we may include or offer third party
          products or services on our website. These third party sites have
          separate and independent privacy policies. We therefore have no
          responsibility or liability for the content and activities of these
          linked sites. Nonetheless, we seek to protect the integrity of our
          site and welcome any feedback about these sites.
        </p>

        <p>
          <b>Terms & Conditions</b>
        </p>

        <p>
          Please also visit our Terms & Condition section establishing the use,
          disclaimers, and limitations of liability governing the use of our
          website.
        </p>

        <p>
          <b>Your Consent</b>
        </p>
        <p>By using our site, you consent to our website privacy policy.</p>
        <p>
          <b>Changes to Our Privacy Policy</b>
        </p>
        <p>
          If we decide to change our privacy policy, we will update the Privacy
          Policy modification date below.
        </p>
        <p>This policy was last modified on 02/1/2021.</p>
        <p>
          <b>Contacting Us</b>
        </p>
        <p>
          If there are any questions regarding this privacy policy you may
          contact us using the information below.
        </p>
        <p>
          <b>Newsoko Nigeria,</b>
          <br />
          Isolo Mushin Lagos <br />
          22a Olubi Str <br />
          {/* http://www.dealsmarineparts.com <br /> */}
          info@newsoko.org <br />
          {/* (757) 391-4366 <br /> */}
        </p>
      </div>
    </div>
  );
};

export default Privacy;
