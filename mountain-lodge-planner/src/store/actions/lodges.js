import * as actionTypes from './actionTypes'
import axios from '../../axios';
import remodelData from '../../hoc/remodelData'

// SYNC FUNCTIONS
export const startLoading = loadingMessage => {
  return { type: actionTypes.START_LOADING, loadingMessage }
}


// HELPER FUNCTIONS FOR ASYNC FUNCTIONS
const updateDataSuccess = lodges => {
  return { type: actionTypes.UPDATE_DATA_SUCCESS, lodges }
}

const updateDataFail = error => {
  return { type: actionTypes.UPDATE_DATA_FAIL, error }
}

const deleteLodgeSuccess = lodges => {
  return { type: actionTypes.UPDATE_DATA_SUCCESS, lodges }
}

const deleteLodgeFail = error => {
  return { type: actionTypes.DELETE_LODGE_FAIL, error }
}

// ASYNC FUNCTIONS
export const updateData = () => dispatch => {
  dispatch(startLoading('Retrieving data...'))
  setTimeout(() => {
    axios.get('/lodges.json')
      .then(res => dispatch(updateDataSuccess(remodelData(res.data))))
      .catch(err => dispatch(updateDataFail(err)))
  }, 500)
}

export const deleteLodge = id => dispatch => {
  dispatch(startLoading('Deleting data...'))
  setTimeout(() => {
    axios.get('/lodges.json')
      .then(res => {
        if (res.data[id].adjacentLodges) {
          res.data[id].adjacentLodges.forEach(adjID => {
            const adjLodge = res.data[adjID.id]
            adjLodge && (adjLodge.adjacentLodges = adjLodge.adjacentLodges
              .filter(adjLodge => adjLodge.id !== id))
          })
        }
        delete res.data[id]
        dispatch(startLoading('Updating data...'))
        axios.put('/lodges.json', res.data)
          .then(res => dispatch(deleteLodgeSuccess(remodelData(res.data))))
          .catch(err => deleteLodgeFail(err))
      })
      .catch(err => deleteLodgeFail(err))
  }, 500);
}