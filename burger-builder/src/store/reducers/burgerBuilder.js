import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false,
  error: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const reducer = (state = initialState, action) => {
  const ingredients = { ...state.ingredients }

  const setPurchasable = ingredients =>
    Object.values(ingredients).some(item => item > 0)


  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      ingredients[action.ingredient] = state.ingredients[action.ingredient] + 1
      return {
        ...state,
        ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        purchasable: setPurchasable(ingredients)
      }
    case actionTypes.REMOVE_INGREDIENT:
      ingredients[action.ingredient] = state.ingredients[action.ingredient] - 1
      return ingredients[action.ingredient] < 0 ? state : {
        ...state,
        ingredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
        purchasable: setPurchasable(ingredients)
      }
    default:
      return state
  }
}

export default reducer