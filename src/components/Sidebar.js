import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { name: "Home", url: "" },
    { name: "Orders", url: "orders" },
    { name: "Products", url: "products" },
    { name: "Message", url: "message" },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              to={link.url === "" ? "/dashboard" : "/dashboard/" + link.url}
            >
              <li
                className={
                  pathname.includes(link.url) && link.name !== "Home"
                    ? "sidebar__list__item active"
                    : pathname === "/dashboard" && link.name === "Home"
                    ? "sidebar__list__item active"
                    : "sidebar__list__item"
                }
              >
                {link.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
