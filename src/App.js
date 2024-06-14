import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/styles/scss/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-slideshow-image/dist/styles.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Privacy from "./pages/Privacy";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Account from "./pages/Account";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./context/MainContext";
import { userLogOut } from "./context/Action";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeDB from "./pages/HomeDB";
import OrdersDB from "./pages/OrdersDB";
import OrderItemDB from "./pages/OrderItemDB";
import MessageDB from "./pages/MessageDB";
import ProductsDB from "./pages/ProductsDB";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import VerifyMail from "./pages/VerifyMail";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { user, dispatch } = useContext(Context);

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (user && user?.id) {
          localStorage.removeItem("sokoUser");
          dispatch(userLogOut());
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:name" element={<Shop />} />
            <Route path="products/:cat" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="returns" element={<Returns />} />
            <Route path="terms&conditions" element={<Terms />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="login" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verify-mail/:token" element={<VerifyMail />} />
            <Route path="forgot-password" element={<ForgetPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomeDB />} />
            <Route path="orders" element={<OrdersDB />} />
            <Route path="orders/:id" element={<OrderItemDB />} />
            <Route path="message" element={<MessageDB />} />
            <Route path="products" element={<ProductsDB />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
