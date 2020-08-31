import React, { Component, Fragment } from 'react'
import classes from './EditLodge.module.css'
import LodgeForm from '../../containers/LodgeForm/LodgeForm';
import HeadingSecondary from '../UI/Heading/HeadingSecondary/HeadingSecondary'

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/lodges'

class EditLodge extends Component {

  submitHandler = event => {
    event.preventDefault();
    this.props.onEditLodge(this.props.id, this.props.lodgeData);
    this.props.history.push('/')
  }

  render() {
    let output = (
      <Fragment>
        <HeadingSecondary>Edit Lodge Data</HeadingSecondary>
        <LodgeForm
          cancel={() => this.props.history.push('/')}
          paramsID={this.props.match.params.id}
        />
        <div className={classes.Buttons}>
          <button
            onClick={this.props.history.goBack}
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
            onClick={() => {
              this.props.onDeleteLodge(this.props.id);
              this.props.history.push('/')
            }}
            className={classes.deleteButton}
          >
            <i className="fas fa-trash-alt fa-2x"></i>
          </button>
        </div>
      </Fragment>
    )

    return output
  }
}

const mapStateToProps = state => {
  return {
    lodges: state.lodges.lodges,
    lodgeData: state.lodgeForm.lodgeData,
    id: state.lodgeForm.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateData: () => dispatch(actionCreators.updateData()),
    onDeleteLodge: id => dispatch(actionCreators.deleteLodge(id)),
    onEditLodge: (id, lodgeData) => dispatch(actionCreators.editLodge(id, lodgeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLodge)