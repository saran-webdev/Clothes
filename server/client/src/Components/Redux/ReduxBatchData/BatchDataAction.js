import * as types from "./BatchDataActionType";

export const incrementCount = () => {
  return {
    type: types.INCREMENT_COUNT
  };
};

export const decrementCount = () => {
  return {
    type: types.DECREMENT_COUNT
  };
};

// export const incrementCount = (product) => {
//   return async (dipatch) => {
//     dipatch({
//       type: types.INCREMENT_COUNT,
//       payload: product
//     });
//   };
// };

// export const decrementCount = (product) => {
//   return async (dispatch) => {
//     dispatch({
//       type: types.DECREMENT_COUNT,
//       payload: product
//     });
//   };
// };
