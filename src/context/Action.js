export const userLoginSuccess = (user) => ({
  type: "USER_LOGIN_SUCCESS",
  payload: user,
});

export const userLogOut = () => ({
  type: "USER_LOGOUT",
});

export const cartFetchSuccess = (cart) => ({
  type: "CART_FETCH_SUCCESS",
  payload: cart,
});

export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const updateCart = (cart) => ({
  type: "UPDATE_CART",
  payload: cart,
});

export const orderIdFetchSuccess = (orderId) => ({
  type: "ORDER_ID_SUCCESS",
  payload: orderId,
});

export const updateShippingDetails = (detail) => ({
  type: "UPDATE_SHIPPING_DETAILS",
  payload: detail,
});

export const productsFetchSuccess = (products) => ({
  type: "PRODUCTS_FETCH_SUCCESS",
  payload: products,
});

export const productFetchSuccess = (product) => ({
  type: "PRODUCT_FETCH_SUCCESS",
  payload: product,
});
