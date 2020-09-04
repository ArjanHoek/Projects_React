import React from "react";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import store from "../redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div>
        <ShoppingCart />
        <ProductList />
      </div>
    </Provider>
  );
}

export default App;
