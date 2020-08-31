import React, { Component, Fragment } from 'react';
import classes from './AddLodge.module.css';
import axios from '../../axios';
import HeadingSecondary from '../../components/UI/Heading/HeadingSecondary/HeadingSecondary';
import LodgeForm from '../../containers/LodgeForm/LodgeForm'

import { resetLodgeData } from '../../store/actions/index'
import { addLodge } from '../../store/actions/index'


import { connect } from 'react-redux';

class AddLodge extends Component {

  componentDidMount = () => this.props.onResetLodgeData()

  submitHandler = event => {
    event.preventDefault();
    this.props.onAddLodge(this.props.lodgeData);
    this.props.history.push('/')
  }

  render() {
    let output = (
      <Fragment>
        <HeadingSecondary>Add New Lodge</HeadingSecondary>
        <LodgeForm cancel={() => this.props.match.history.push('/')} />
        <div className={classes.Buttons}>
          <button onClick={() => this.props.history.push('/')}
            className={classes.previousButton}><i className="fas fa-chevron-left fa-2x"></i></button>
          <button onClick={this.submitHandler} className={classes.addButton}>
            <i className="fas fa-plus-square fa-2x"></i>
          </button>
        </div>
      </Fragment>
    )

    return output
  }
}

const mapStateToProps = state => {
  return {
    lodgeData: state.lodgeForm.lodgeData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetLodgeData: () => dispatch(resetLodgeData()),
    onAddLodge: lodgeData => dispatch(addLodge(lodgeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLodge)