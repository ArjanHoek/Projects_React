import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import shoppingCartReducer from "./shoppingCart/shoppingCartReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  shoppingCart: shoppingCartReducer,
});

export default rootReducer;
