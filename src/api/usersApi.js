import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL + "/api";

export const fetchProducts = (page) => {
  return axios.get(`${apiURL}/product/all/${page}`);
};

export const fetchProduct = (id) => {
  return axios.get(`${apiURL}/product/${id}`);
};

export const fetchProductsByBestSeller = (page) => {
  return axios.get(`${apiURL}/product/best-sellers/${page}`);
};

export const fetchProductsByWholeSale = (page) => {
  return axios.get(`${apiURL}/product/whole-sale/${page}`);
};

export const fetchProductsBySearch = (query, page) => {
  return axios.get(`${apiURL}/product/search/${query}/${page}`);
};

export const fetchProductsBycategory = (page, cat) => {
  return axios.get(`${apiURL}/product/category/${cat}/${page}`);
};

export const sendMessage = (data) => {
  return axios.post(`${apiURL}/message/add`, data);
};

export const login = (data) => {
  return axios.post(`${apiURL}/auth/signin`, data);
};

export const signup = (data) => {
  return axios.post(`${apiURL}/auth/signup`, data);
};

export const initPayment = (data) => {
  return axios.post(`${apiURL}/order/add`, data);
};

export const PaymentApproved = (orderID) => {
  return axios.put(`${apiURL}/order/success/${orderID}`);
};

export const fetchUserOrder = (userId, token) => {
  return axios.get(`${apiURL}/order/user/${userId}`, {
    headers: { Authorization: "Bearer " + token },
  });
};
