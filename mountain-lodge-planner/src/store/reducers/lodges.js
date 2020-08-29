import * as actionTypes from '../actions/actionTypes'

// SET INITIAL STATE
const initialState = { lodges: [], loading: true, loadingMessage: "Loading...", error: null }

// CREATE SOME HELPER FUNCTIONS
const startLoading = (state, action) => {
  return { ...state, loading: true, loadingMessage: action.loadingMessage }
}

const updateDataSuccess = (state, action) => {
  return { ...state, loading: false, lodges: action.lodges }
}

const updateDataFail = (state, action) => {
  return { ...state, loading: false, error: action.error }
}

const deleteLodgeSuccess = (state, action) => {
  return { ...state, loading: false, lodges: action.lodges }
}

const deleteLodgeFail = (state, action) => {
  return { ...state, loading: false, error: action.error }
}

// CREATE THE ACTUAL REDUCER
const lodgesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return startLoading(state, action)
    case actionTypes.UPDATE_DATA_SUCCESS:
      return updateDataSuccess(state, action)
    case actionTypes.UPDATE_DATA_FAIL:
      return updateDataFail(state, action)
    case actionTypes.DELETE_LODGE_SUCCESS:
      return deleteLodgeSuccess(state)
    case actionTypes.UPDATE_DATA_FAIL:
      return deleteLodgeFail(state, action)
    default: return state
  }
}

// EXPORT THE REDUCER
export default lodgesReducer