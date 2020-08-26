import * as actionTypes from '../actions/actionTypes'
import { updateObject, updatePurchasable } from '../utility'

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

const addIngredient = (state, action) => {
  const ingredient = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1
  }
  const ingredients = updateObject(state.ingredients, ingredient);
  const newState = {
    ingredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
    purchasable: updatePurchasable(ingredients)
  }
  return updateObject(state, newState)
}

const removeIngredient = (state, action) => {
  const ingredient = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1
  }
  const ingredients = updateObject(state.ingredients, ingredient);
  const newState = {
    ingredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
    purchasable: updatePurchasable(ingredients)
  }
  return updateObject(state, newState)
}

const setIngredients = (state, action) => {
  const ingredients = {
    salad: action.ingredients.salad,
    bacon: action.ingredients.bacon,
    cheese: action.ingredients.cheese,
    meat: action.ingredients.meat,
  };
  return updateObject(state, {
    ...state,
    ingredients,
    error: false,
    totalPrice: 4,
    purchasable: updatePurchasable(ingredients)
  })
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    ...state,
    error: true
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action)
    default:
      return state
  }
}

export default reducer