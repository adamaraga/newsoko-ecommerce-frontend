import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL + "/api";

export const fetchUsers = (page, token) => {
  return axios.get(`${apiURL}/user/all/${page}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchDashboardCount = (token) => {
  return axios.get(`${apiURL}/count/dashboard`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchUsersBySearch = (query, token, page) => {
  return axios.get(`${apiURL}/user/search/${query}/${page}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchMessage = (page, token) => {
  return axios.get(`${apiURL}/message/all/${page}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchOrder = (token, id) => {
  return axios.get(`${apiURL}/order/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchOrders = (page, token) => {
  return axios.get(`${apiURL}/order/all/${page}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchOrdersBySearch = (query, token, page) => {
  return axios.get(`${apiURL}/order/search/${query}/${page}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const addProduct = (data, token) => {
  return axios.post(`${apiURL}/product/add`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const editProduct = (data, token, id) => {
  return axios.put(`${apiURL}/product/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const editProductImage = (data, token, id) => {
  return axios.put(`${apiURL}/product/images/${id}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const deleteProduct = (token, id) => {
  return axios.delete(`${apiURL}/product/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
};
