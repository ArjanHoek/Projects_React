import * as actionTypes from './actionTypes'

export const setLodgeData = (lodge) => {
  return { type: actionTypes.SET_LODGE_DATA, lodge }
}

export const changeInput = (name, value) => {
  return { type: actionTypes.CHANGE_INPUT, name, value }
}

// const addAdjacentLodge = (state, action) => {
//   return { ...state, }
// }

