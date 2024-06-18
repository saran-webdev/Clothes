import * as types from "./CartDataActionType";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const userAction = (userData) => {
  console.log(userData);

  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_ACTION",
        payload: userData
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userRefresh = () => {
  const id = localStorage.getItem("userId");
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/get/user/${id}`);
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: "USER_ACTION",
          payload: response.data.userData
        });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product) => {
  const productId = product._id;
  // console.log(product);

  return async (dispatch) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/cart/add`, {
        productId: productId,
        userId: localStorage.getItem("userId")
      });
      console.log(response);
      if (response.status === 200) {
        console.log("Add To Cart");
        dispatch({
          type: types.ADD_TO_CART,
          payload: product
        });
      }
      return response; // Always return response object
    } catch (error) {
      console.log(error);
      return { status: error.response?.status || 500 }; // Return an object with status property indicating the error status
    }
  };
};

export const removeFromCart = (productId) => {
  const userId = localStorage.getItem("userId");

  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/remove/${userId}/${productId}`
      );
      if (response.status === 200) {
        dispatch({
          type: types.REMOVE_FROM_CART,
          payload: productId
        });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
