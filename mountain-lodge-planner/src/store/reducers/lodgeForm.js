import * as actionTypes from '../actions/actionTypes'

const initialState = {
  lodgeData: {
    name: "",
    altitude: "",
    region: "",
    adjacentLodges: []
  },
  id: ''
}

const setLodgeData = (action) => {
  return {
    id: action.lodge.id,
    lodgeData: {
      name: action.lodge.name,
      altitude: action.lodge.altitude,
      region: action.lodge.region,
      adjacentLodges: action.lodge.adjacentLodges
        ? action.lodge.adjacentLodges.map(i => { return { ...i } })
        : []
    }
  }
}

const changeInput = (state, action) => {
  const lodgeData = { ...state.lodgeData, [action.name]: action.value.toLowerCase() }
  return { ...state, lodgeData }
}


const lodgeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LODGE_DATA:
      return setLodgeData(action)
    case actionTypes.CHANGE_INPUT:
      return changeInput(state, action)
    // case actionTypes.ADD_ADJACENT_LODGE:
    //   return
    // case actionTypes.EDIT_ADJACENT_LODGE:
    //   return
    // case actionTypes.REMOVE_ADJACENT_LODGE:
    //   return
    default: return state
  }
}

export default lodgeFormReducer