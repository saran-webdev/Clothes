import * as types from "./BatchDataActionType";

// const initialState = {
//   count: 0
// };

// const countReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.INCREMENT_COUNT:
//       return {
//         ...state,
//         count: state.count + 1
//       };
//     case types.DECREMENT_COUNT:
//       return {
//         ...state,
//         count: state.count > 0 ? state.count - 1 : 0
//       };
//     default:
//       return state;
//   }
// };
// console.log(initialState);
// export default countReducer;

const savedBatchState = JSON.parse(localStorage.getItem("batchState"));
const initialState = {
  count: savedBatchState ? savedBatchState.count : 0
};

const countReducer = (state = initialState, action) => {
  const { type } = action;
  let batchState;

  switch (type) {
    case types.INCREMENT_COUNT:
      batchState = {
        ...state,
        count: state.count + 1
      };
      break;
    case types.DECREMENT_COUNT:
      batchState = {
        ...state,
        count: state.count > 0 ? state.count - 1 : 0
      };
      break;
    default:
      return state;
  }
  try {
    localStorage.setItem("batchState", JSON.stringify(batchState));
  } catch (error) {
    console.error("Error saving batch state to local storage:", error);
  }
  return batchState;
};
console.log(initialState);

export default countReducer;
