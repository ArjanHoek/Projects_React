import React, { Component } from 'react'
import classes from './LodgeCard.module.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/lodges'

class Lodge extends Component {
  render() {
    const output = (
      <div className={classes.LodgeCard}>
        <div className={classes.iconsContainer}>
          <Link to={`/edit/${this.props.lodge.name}`}>
            <i
              className={`fas fa-pencil-alt ${classes.edit}`}>
            </i>
          </Link>
          <i
            onClick={() => this.props.onDeleteLodge(this.props.lodge.id)}
            className={`fas fa-trash-alt ${classes.delete}`}>
          </i>
        </div>
        <div className={classes.HeadingContainer}>
          <h3>{this.props.lodge.name}</h3>
        </div>
        <div className={classes.info}>
          <p><i className="fas fa-image"></i> {this.props.lodge.region}</p>
          <p><i className="fas fa-arrow-circle-up"></i> {this.props.lodge.altitude}m</p>
        </div>
      </div>
    )

    return output
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteLodge: id => dispatch(actionCreators.deleteLodge(id))
  }
}

export default connect(null, mapDispatchToProps)(Lodge)