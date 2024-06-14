import paymentIcons from "../assets/images/PaymentIcons.png";
import footerIcon1 from "../assets/images/svg/footerIcon1.svg";
import footerIcon2 from "../assets/images/svg/footerIcon2.svg";
import footerIcon3 from "../assets/images/svg/footerIcon3.svg";
import logoIcon from "../assets/images/logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "About Us", url: "/about" },
    { name: "Shipping", url: "/shipping" },
    { name: "Returns", url: "/returns" },
    { name: "Contact Us", url: "/contact-us" },
    { name: "Terms & Conditions", url: "/terms&Conditions" },
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "My account", url: "/account" },
  ];
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__main__top">
          <Link to="/">
            <img src={logoIcon} alt="" className="footer__main__top__logo" />
          </Link>
          <div className="footer__main__top__links">
            <div className="footer__main__top__links__item">
              <img src={footerIcon1} alt="" />
              <p>Toll free: +1(800)211-0479</p>
            </div>
            <div className="footer__main__top__links__item">
              <img src={footerIcon1} alt="" />
              <p>Local: +1(757)391-4366</p>
            </div>
            <div className="footer__main__top__links__item">
              <img src={footerIcon2} alt="" />
              <p>info@newsoko.org</p>
            </div>
            <div className="footer__main__top__links__item">
              <img src={footerIcon3} alt="" />
              <p>1218 Carolina Road Suffolk VA 23434</p>
            </div>
          </div>
        </div>
        <div className="footer__main__bottom">
          <ul className="footer__main__bottom__links">
            {links?.map((link, i) => {
              return (
                <Link key={i} to={link.url}>
                  <li>{link.name}</li>
                </Link>
              );
            })}
          </ul>

          <div className="footer__main__bottom__imgCon">
            <img src={paymentIcons} alt="" />
          </div>
        </div>
      </div>
      <div className="footer__right">
        <p>
          News Oko Part 2024 -{" "}
          <a style={{ color: "#07213e" }} href="http://www.lilysolutions.org/">
            Powered by Lilysolutions limited
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
