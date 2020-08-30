import React, { Component, Fragment } from 'react'
import classes from './EditLodge.module.css'
import axios from '../../axios'
import LodgeForm from '../../containers/LodgeForm/LodgeForm';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/lodges'

class EditLodge extends Component {
  state = {
    error: null,
    id: ""
  }

  deleteHandler = () => {
    if (this.props.deleteLodge(this.state.id)) {
      this.props.history.goBack()
    }
  }

  submitHandler = event => {
    event.preventDefault();
    if (this.props.setLoading('Editing data...')) {
      this.props.history.goBack()
    }
    axios.get('/lodges.json')
      .then(res => {
        for (let key in res.data) {
          if (!res.data[key].adjacentLodges) {
            res.data[key].adjacentLodges = []
          }
          const filteredAdjacentLodges = res.data[key].adjacentLodges
            .filter(lodge => lodge.id !== this.state.id)
          res.data[key].adjacentLodges = filteredAdjacentLodges
        }
        if (res.data[this.state.id]) {
          res.data[this.state.id] = this.state.lodgeData
          this.state.lodgeData.adjacentLodges.forEach(adjLodge => {
            res.data[adjLodge.id].adjacentLodges.push({
              id: this.state.id,
              outward: adjLodge.return,
              return: adjLodge.outward
            })
          })
        }
        axios.put('/lodges.json', res.data)
          .then(() => this.props.updateData())
          .catch(error => this.setState({ error }));

      })
  }

  goBackHandler = () => {
    this.props.history.goBack()
  }

  render() {
    let output = (
      <Fragment>
        <LodgeForm
          {...this.props}
        />

        <div className={classes.Buttons}>
          <button
            onClick={this.goBackHandler}
            className={classes.previousButton}
          >
            <i className="fas fa-chevron-left fa-2x"></i>
          </button>
          <button
            onClick={this.submitHandler}
            className={classes.editButton}
          >
            <i className="fas fa-save fa-2x"></i>
          </button>
          <button
            onClick={this.deleteHandler}
            className={classes.deleteButton}
          >
            <i className="fas fa-trash-alt fa-2x"></i>
          </button>
        </div>
      </Fragment>
    )

    this.state.error && (output = <h3>ERROR</h3>)

    return output
  }
}

const mapStateToProps = state => {
  return {
    lodges: state.lodges.lodges,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateData: () => dispatch(actionCreators.updateData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLodge)