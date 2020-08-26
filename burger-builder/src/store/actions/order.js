import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id, data
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (data) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', data)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, data))
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}



export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map(id => {
          return { id, ...res.data[id] }
        })
        dispatch(fetchOrdersSuccess(orders))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }

}