import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const apiMain = apiURL + "/api";

// export const fetchUser = () => {
//   return axios.get(`${process.env.REACT_APP_API_URL_USER}`);
// };

// export const fetchUserMessageCount = (userId) => {
//   return axios.get(`${apiURLMain}/api/messages/count/${userId}`);
// };

export const fetchProducts = (page) => {
  return axios.get(`${apiMain}/product/all/${page}`);
};

export const fetchProduct = (id) => {
  return axios.get(`${apiMain}/product/${id}`);
};

export const fetchProductsByBestSeller = (page) => {
  return axios.get(`${apiMain}/product/best-sellers/${page}`);
};

export const fetchProductsByWholeSale = (page) => {
  return axios.get(`${apiMain}/product/whole-sale/${page}`);
};

export const fetchProductsBySearch = (query, page) => {
  return axios.get(`${apiMain}/product/search/${query}/${page}`);
};

export const fetchProductsBycategory = (page, cat) => {
  return axios.get(`${apiMain}/product/category/${cat}/${page}`);
};

export const sendMessage = (data) => {
  return axios.post(`${apiMain}/message/add`, data);
};

export const login = (data) => {
  return axios.post(`${apiMain}/auth/signin`, data);
};

export const signup = (data) => {
  return axios.post(`${apiMain}/auth/signup`, data);
};

export const initPayment = (data) => {
  return axios.post(`${apiMain}/order/add`, data);
};

export const PaymentApproved = (orderID) => {
  return axios.put(`${apiMain}/order/success/${orderID}`);
};

export const fetchUserOrder = (userId, token) => {
  return axios.get(`${apiMain}/order/user/${userId}`, {
    headers: { Authorization: "Bearer " + token },
  });
};
