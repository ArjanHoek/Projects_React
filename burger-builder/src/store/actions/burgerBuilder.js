import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient
  }
}

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://my-react-burger-app-proj01.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed)
      })
  }
}