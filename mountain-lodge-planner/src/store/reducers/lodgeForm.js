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
        ? action.lodge.adjacentLodges : []
    }
  }
}

const changeInput = (state, action) => {
  const lodgeData = { ...state.lodgeData, [action.name]: action.value.toLowerCase() }
  return { ...state, lodgeData }
}

const addAdjacentLodge = (state, action) => {
  const adjacentLodges = [...state.lodgeData.adjacentLodges];
  const notSelf = id => id !== state.id;
  const notAddedYet = id => !adjacentLodges.some(i => i.id === id)
  const firstLodge = action.lodges
    .filter(lodge => notSelf(lodge.id) && notAddedYet(lodge.id))[0];
  firstLodge && (adjacentLodges.push({
    id: firstLodge.id,
    outward: { hours: "", minutes: "" },
    return: { hours: "", minutes: "" }
  }))
  const lodgeData = { ...state.lodgeData, adjacentLodges };
  return { ...state, lodgeData }
}

const editAdjacentLodge = (state, action) => {
  const adjacentLodges = [...state.lodgeData.adjacentLodges]
    .map(lodge => lodge.id === action.id ? action.editedLodge : lodge)
  const lodgeData = { ...state.lodgeData, adjacentLodges };
  return { ...state, lodgeData };
}

const removeAdjacentLodge = (state, action) => {
  const adjacentLodges = state.lodgeData.adjacentLodges.filter(item => item.id !== action.id);
  const lodgeData = { ...state.lodgeData, adjacentLodges };
  return { ...state, lodgeData };
}

const lodgeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LODGE_DATA:
      return setLodgeData(action)
    case actionTypes.CHANGE_INPUT:
      return changeInput(state, action)
    case actionTypes.ADD_ADJACENT_LODGE:
      return addAdjacentLodge(state, action)
    case actionTypes.EDIT_ADJACENT_LODGE:
      return editAdjacentLodge(state, action)
    case actionTypes.REMOVE_ADJACENT_LODGE:
      return removeAdjacentLodge(state, action)
    default: return state
  }
}

export default lodgeFormReducer