import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import { thunk } from "redux-thunk";
import { cartReducer } from "./ReduxCartData/CartDataReducer";
// import { orderReducer } from "./ReduxCartData/OrderDataReducer";
// import batchReducer from "./ReduxBatchData/BatchDataReduce";

const rootReducer = combineReducers({
  cartData: cartReducer,
  // orderData: orderReducer,
  // batchReducer: batchReducer
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
export const Store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
