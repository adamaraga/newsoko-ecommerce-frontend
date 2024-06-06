import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogOut } from "../context/Action";
import { useContext } from "react";
import { Context } from "../context/MainContext";

const Sidebar = ({ drawer, setModalIsOpen }) => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { name: "Home", url: "" },
    { name: "Orders", url: "orders" },
    { name: "Products", url: "products" },
    { name: "Message", url: "message" },
  ];
  const handleLogout = () => {
    localStorage.removeItem("sokoUser");
    dispatch(userLogOut());
    navigate("/login");
  };
  return (
    <div className={drawer ? "sidebar draw" : "sidebar"}>
      <ul className="sidebar__list">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              to={link.url === "" ? "/dashboard" : "/dashboard/" + link.url}
              onClick={() => drawer && setModalIsOpen(false)}
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

      <button className="btn sidebar__btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
