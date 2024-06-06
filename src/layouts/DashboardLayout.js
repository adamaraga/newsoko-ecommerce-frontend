import { useContext, useEffect } from "react";
import { Context } from "../context/MainContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import logoIcon from "../assets/images/logo.jpeg";
import Sidebar from "../components/Sidebar";
import { userLogOut } from "../context/Action";

const DashboardLayout = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.roles === "user") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sokoUser");
    dispatch(userLogOut());
    navigate("/login");
  };

  return (
    <div className="dashboardLayout">
      <nav className="dashboardLayout__topbar">
        <Link to="/dashboard">
          <img
            src={logoIcon}
            alt=""
            className="dashboardLayout__topbar__logo"
          />
        </Link>

        <div className="dashboardLayout__topbar__info">
          <p>
            Welcome{" "}
            <b>
              {user?.firstName}
              {user?.lastName}
            </b>
          </p>

          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
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
