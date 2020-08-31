import * as actionTypes from './actionTypes'
import axios from '../../axios';
import remodelData from '../../utilities/remodelData'

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
  return { type: actionTypes.DELETE_LODGE_SUCCESS, lodges }
}

const deleteLodgeFail = error => {
  return { type: actionTypes.DELETE_LODGE_FAIL, error }
}

const editLodgeSuccess = lodges => {
  return { type: actionTypes.EDIT_LODGE_SUCCESS, lodges }
}

const editLodgeFail = error => {
  return { type: actionTypes.EDIT_LODGE_FAIL, error }
}

const addLodgeSuccess = lodges => {
  return { type: actionTypes.ADD_LODGE_SUCCESS, lodges }
}

const addLodgeFail = error => {
  return { type: actionTypes.ADD_LODGE_FAIL, error }
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
        setTimeout(() => {
          axios.put('/lodges.json', res.data)
            .then(res => dispatch(deleteLodgeSuccess(remodelData(res.data))))
            .catch(err => dispatch(deleteLodgeFail(err)))
        }, 500);

      })
      .catch(err => dispatch(deleteLodgeFail(err)))
  }, 500);
}

export const editLodge = (id, lodgeData) => dispatch => {
  dispatch(startLoading('Editing data...'));
  setTimeout(() => {
    axios.get('/lodges.json')
      .then(res => {
        for (let key in res.data) {
          if (!res.data[key].adjacentLodges) {
            res.data[key].adjacentLodges = []
          }
          const filteredAdjacentLodges = res.data[key].adjacentLodges
            .filter(lodge => lodge.id !== id)
          res.data[key].adjacentLodges = filteredAdjacentLodges
        }
        if (res.data[id]) {
          res.data[id] = lodgeData;
          lodgeData.adjacentLodges.forEach(adjLodge => {
            res.data[adjLodge.id].adjacentLodges.push({
              id: id,
              outward: adjLodge.return,
              return: adjLodge.outward
            })
          })
        }
        dispatch(startLoading('Updating data...'))
        axios.put('/lodges.json', res.data)
          .then(res => dispatch(editLodgeSuccess(remodelData(res.data))))
          .catch(err => dispatch(editLodgeFail(err)));
      })
      .catch(err => dispatch(editLodgeFail(err)))
  }, 500);
}



export const addLodge = lodgeData => dispatch => {
  dispatch(startLoading('Adding lodge...'));
  setTimeout(() => {
    axios.post('/lodges.json', lodgeData)
      .then(() => {
        dispatch(startLoading('Updating data...'));
        axios.get('/lodges.json')
          .then(res => dispatch(addLodgeSuccess(remodelData(res.data))))
          .catch(err => dispatch(addLodgeFail(err)))
      })
      .catch(err => dispatch(addLodgeFail(err)));
  }, 800);
}