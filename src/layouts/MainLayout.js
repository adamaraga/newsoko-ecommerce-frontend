import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
