// cartReducer.js
import * as types from "./CartDataActionType";

const initialState = {
  userData: null,
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_ACTION":
      return {
        ...state,
        userData: payload
      };
    default:
      return state;
  }
};

// console.log(initialState);
