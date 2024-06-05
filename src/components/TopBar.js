import React, { useState } from "react";
import searchIcon from "../assets/images/svg/search.svg";
import profileIcon from "../assets/images/svg/profile.svg";
import logoIcon from "../assets/images/logo.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HoverMenu from "./HoverMenu";
import CartModal from "./CartModal";
import Drawer from "./Drawer";
import SearchDrawer from "./SearchDrawer";

const TopBar = () => {
  const [name, setName] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "shop",
      link: "/shop",
    },
    {
      name: "Yamaha",
      link: "/products/yamaha",
      dropDown: true,
      subLinks: [
        {
          name: "Yamaha Outboard Motor",
          link: "/products/yamaha-outboard-motor",
        },
        {
          name: "Yamaha Outboard Parts",
          link: "/products/yamaha-outboard-parts",
        },
      ],
    },
    {
      name: "suzuki",
      link: "/products/suzuki",
      dropDown: true,
      subLinks: [
        {
          name: "suzuki Outboard Motor",
          link: "/products/suzuki-outboard-motor",
        },
        {
          name: "suzuki Outboard Parts",
          link: "/products/suzuki-outboard-parts",
        },
      ],
    },
    {
      name: "mecury",
      link: "/products/mecury",
      dropDown: true,
      subLinks: [
        {
          name: "mecury Outboard engine",
          link: "/products/mecury-outboard-engine",
        },
        {
          name: "mecury Outboard Parts",
          link: "/products/mecury-outboard-parts",
        },
      ],
    },
    {
      name: "johnson",
      link: "/products/johnson",
    },
    {
      name: "evinrude",
      link: "/products/evinrude",
      dropDown: true,
      subLinks: [
        {
          name: "evinrude Outboard Motor",
          link: "/products/evinrude-outboard-motor",
        },
        {
          name: "evinrude Outboard Parts",
          link: "/products/evinrude-outboard-parts",
        },
      ],
    },
    {
      name: "nissan",
      link: "/products/nissan",
    },
    {
      name: "marine electronics",
      link: "/products/marine-electronics",
    },
    {
      name: "tools",
      link: "/products/tools",
    },
    {
      name: "accessories",
      link: "/products/accessories",
    },
  ];

  const handleSearch = () => {
    if (name) {
      navigate(`shop/${name}`);
      setName("");
    }
  };

  return (
    <nav className="topbar">
      <div className="topbar__top">
        <Link to="/">
          <img src={logoIcon} alt="" className="topbar__top__logo" />
        </Link>

        <div className="topbar__top__left">
          <SearchDrawer />

          <div className="topbar__top__form">
            <input
              placeholder="Search..."
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button onClick={handleSearch}>
              <img src={searchIcon} alt="" />
            </button>
          </div>

          <Link to="/account">
            <img src={profileIcon} alt="" className="topbar__top__profile" />
          </Link>
          <CartModal />
        </div>
      </div>

      <div className="topbar__bottom">
        <Drawer links={links} />
        <ul className="topbar__bottom__links">
          {links.map((link, i) => {
            return (
              <div key={i}>
                {link.dropDown ? (
                  <HoverMenu links={link} />
                ) : (
                  <Link to={link.link}>
                    <li
                      className={
                        pathname === link.link
                          ? "topbar__bottom__links__item active"
                          : pathname === "/" && link.name === "home"
                          ? "topbar__bottom__links__item active"
                          : "topbar__bottom__links__item"
                      }
                    >
                      {link.name}
                    </li>
                  </Link>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
