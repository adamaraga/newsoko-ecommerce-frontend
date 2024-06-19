import { useContext, useEffect } from "react";
import { Context } from "../context/MainContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import logoIcon from "../assets/images/logo.png";
import Sidebar from "../components/Sidebar";
import DrawerDB from "../components/DrawerDB";

const DashboardLayout = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.roles === "user") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="dashboardLayout">
      <nav className="dashboardLayout__topbar">
        <Link to="/dashboard">
          <img
            src={logoIcon}
            alt=""
            className="dashboardLayout__topbar__logo logo"
          />
        </Link>

        <div className="dashboardLayout__topbar__info">
          <p className="dashboardLayout__topbar__info__text">
            Welcome <b>{user?.firstName}</b>
          </p>
          <DrawerDB />
        </div>
      </nav>

      <Sidebar />
      <div className="dashboardLayout__main">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
