import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { Context } from "../context/MainContext";

const MainLayout = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.roles === "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="mainLayout">
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
