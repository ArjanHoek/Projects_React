import * as actionTypes from './actions'

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 4,
  purchasable: false
}

const reducer = (state = initialState, action) => {
  const ingredients = { ...state.ingredients }

  const setPurchasable = ingredients =>
    Object.values(ingredients).some(item => item > 0)


  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      ingredients[action.payload.ingredient] = state.ingredients[action.payload.ingredient] + 1
      return {
        ...state,
        ingredients,
        totalPrice: state.totalPrice + action.payload.price,
        purchasable: setPurchasable(ingredients)
      }
    case actionTypes.REMOVE_INGREDIENT:
      ingredients[action.payload.ingredient] = state.ingredients[action.payload.ingredient] - 1
      return ingredients[action.payload.ingredient] < 0 ? state : {
        ...state,
        ingredients,
        totalPrice: state.totalPrice - action.payload.price,
        purchasable: setPurchasable(ingredients)
      }
    default:
      return state
  }
}

export default reducer