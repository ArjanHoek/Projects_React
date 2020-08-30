import React, { Component, Fragment } from 'react';

import LodgeCard from './LodgeCard/LodgeCard'
import Spinner from '../UI/Spinner/Spinner'
import HeadingSecondary from '../UI/Heading/HeadingSecondary/HeadingSecondary'

import sort from '../../utilities/sort'

import classes from './AllLodges.module.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/lodges'

class AllLodges extends Component {
  componentDidMount = () => this.props.onUpdateData()

  render() {
    let output = <Spinner>{this.props.loadingMessage}</Spinner>

    let lodgeCards = (
      <div>
        <h3 className={classes.NoData}>No lodges to display</h3>
      </div>
    );

    if (this.props.lodges) {
      lodgeCards = sort(this.props.lodges)
        .map(lodge => <LodgeCard key={lodge.id} lodge={lodge} />)
    }

    if (!this.props.loading) {
      output = (
        <Fragment>
          <HeadingSecondary>All lodges</HeadingSecondary>
          <div className={classes.cards}>{lodgeCards}</div>
        </Fragment>
      )
    }

    return output
  }
}

const mapStateToProps = state => {
  return {
    lodges: state.lodges.lodges,
    loading: state.lodges.loading,
    loadingMessage: state.lodges.loadingMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateData: () => dispatch(actionCreators.updateData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllLodges)