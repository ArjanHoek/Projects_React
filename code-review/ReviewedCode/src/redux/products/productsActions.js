import axios from "axios";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./productsTypes";

export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    // Originele code:
    // dispatch(fetchProductsRequest)
    // Bovenstaande dispatch wordt niet uitgevoerd, je was de haakjes () erachter vergeten. In de product list component wil je een h2 met 'loading...' laten zien, maar als je die haakjes vergeet wordt de state.loading nooit op true gezet en wordt die h2 nooit getoond. Onderstaande regel is verbeterd, nu werkt het wel.
    dispatch(fetchProductsRequest());
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const products = response.data;
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchProductsFailure(errorMsg));
      });
  };
};
