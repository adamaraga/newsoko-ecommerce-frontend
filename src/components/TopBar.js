import React, { useState } from "react";
import searchIcon from "../assets/images/svg/search.svg";
import profileIcon from "../assets/images/svg/profile.svg";
import logoIcon from "../assets/images/logo.png";
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
        {
          name: "Yamaha Complete Engine",
          link: "/products/yamaha-complete-engine",
        },
        {
          name: "Yamaha New parts",
          link: "/products/yamaha-new-parts",
        },
        {
          name: "Yamaha Used Parts",
          link: "/products/yamaha-used-parts",
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
        {
          name: "suzuki Complete Engine",
          link: "/products/suzuki-complete-engine",
        },
        {
          name: "suzuki New parts",
          link: "/products/suzuki-new-parts",
        },
        {
          name: "suzuki Used Parts",
          link: "/products/suzuki-used-parts",
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
        {
          name: "mecury Complete Engine",
          link: "/products/mecury-complete-engine",
        },
        {
          name: "mecury New parts",
          link: "/products/mecury-new-parts",
        },
        {
          name: "mecury Used Parts",
          link: "/products/mecury-used-parts",
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
      name: "Volvo Penta",
      link: "/products",
      dropDown: true,
      subLinks: [
        {
          name: "Volvo Penta Complete Engine",
          link: "/products/volvo-penta-complete-engine",
        },
        {
          name: "Volvo Penta New parts",
          link: "/products/volvo-penta-new-parts",
        },
        {
          name: "Volvo Penta Used Parts",
          link: "/products/volvo-penta-used-parts",
        },
      ],
    },
    {
      name: "OMC",
      link: "/products",
      dropDown: true,
      subLinks: [
        {
          name: "OMC Complete Engine",
          link: "/products/omc-complete-engine",
        },
        {
          name: "OMC New parts",
          link: "/products/omc-new-parts",
        },
        {
          name: "OMC Used Parts",
          link: "/products/omc-used-parts",
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
      dropDown: true,
      subLinks: [
        {
          name: "Hose",
          link: "/products/accessories-Hose",
        },
        {
          name: "Pump",
          link: "/products/accessories-pump",
        },
        {
          name: "Anchors",
          link: "/products/accessories-anchors",
        },
        {
          name: "Lift Vest",
          link: "/products/accessories-lift-vest",
        },
        {
          name: "Steering",
          link: "/products/accessories-steering",
        },
        {
          name: "Baits & Tackles",
          link: "/products/accessories-baits-&-tackles",
        },
        {
          name: "Fishing Rods",
          link: "/products/accessories-fishing-rods",
        },
      ],
    },
    {
      name: "Propellers",
      link: "/products/propellers",
    },
    {
      name: "Jetski",
      link: "/products/jetski",
    },
    {
      name: "Boats 4 sale ",
      link: "/products/boats-4-sale ",
    },
    {
      name: "Books/Publications",
      link: "/products",
      dropDown: true,
      subLinks: [
        {
          name: "Manuals",
          link: "/products/books-publications-manuals",
        },
        {
          name: "Used books",
          link: "/products/books-publications-used-books",
        },
      ],
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
