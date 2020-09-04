import {
  ADD_ITEM,
  INCREMENT_AMOUNT,
  DECREMENT_AMOUNT,
} from "./shoppingCartTypes";

const initialCartState = {
  products: [],
};

const shoppingCartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, products: state.products.concat(action.payload) };
    case INCREMENT_AMOUNT:
      const updateShoppingCart = state.products.map((productInCart) => {
        if (productInCart.title === action.payload.title) {
          const updatedItem = { ...productInCart };
          updatedItem.amount = updatedItem.amount + 1;
          return updatedItem;
        } else {
          return productInCart;
        }
      });
      return { ...state, products: updateShoppingCart };
    case DECREMENT_AMOUNT:
      const updatedShoppingCart = state.products.map((productInCart) => {
        if (productInCart.title === action.payload.title) {
          const updatedItem = { ...productInCart };
          updatedItem.amount = updatedItem.amount - 1;
          return updatedItem;
        } else {
          return productInCart;
        }
      });
      return { ...state, products: updatedShoppingCart };
    default:
      return state;
  }
};
export default shoppingCartReducer;
