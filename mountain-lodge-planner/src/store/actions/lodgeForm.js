import * as actionTypes from './actionTypes'

export const setLodgeData = lodge => {
  return { type: actionTypes.SET_LODGE_DATA, lodge }
}

export const resetLodgeData = () => {
  return { type: actionTypes.RESET_LODGE_DATA }
}

export const changeInput = (name, value) => {
  return { type: actionTypes.CHANGE_INPUT, name, value }
}

export const addAdjacentLodge = lodges => {
  return { type: actionTypes.ADD_ADJACENT_LODGE, lodges }
}

export const editAdjacentLodge = (editedLodge, id) => {
  return { type: actionTypes.EDIT_ADJACENT_LODGE, editedLodge, id }
}

export const removeAdjacentLodge = id => {
  return { type: actionTypes.REMOVE_ADJACENT_LODGE, id }
}