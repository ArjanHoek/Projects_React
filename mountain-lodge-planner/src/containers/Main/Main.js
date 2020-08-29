import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AddLodge from '../AddLodge/AddLodge'
import AllLodges from '../../components/AllLodges/AllLodges';
import EditLodge from '../../components/EditLodge/EditLodge';
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Main.module.css'

import * as actionCreators from '../../store/actions/lodges'
import { connect } from 'react-redux';

class Main extends Component {

  componentDidMount() { this.props.onUpdateData() }


  render() {
    let output = <Spinner>{this.props.loadingMessage}</Spinner>

    if (!this.props.loading) {
      output = (
        <main className={classes.Main}>
          <Switch>
            <Route
              exact
              path="/all-lodges"
              component={() =>
                <AllLodges
                  updateData={this.props.onUpdateData}
                  lodges={this.props.lodges}
                  deleteLodge={id => this.props.onDeleteLodge(id)}
                />
              }
            />
            <Route
              path="/add-lodge"
              component={props =>
                <AddLodge
                  {...props}
                  updateData={this.props.onUpdateData}
                />
              }
            />
            <Route
              path="/edit/:id"
              component={props =>
                <EditLodge {...props}
                  deleteLodge={id => this.props.onDeleteLodge(id)}
                  updateData={this.props.onUpdateData}
                  lodges={this.props.lodges}
                  setLoading={() => console.log('This does not work yet')}
                />
              }
            />
            <Redirect
              from='/'
              to='all-lodges'
            />
          </Switch>
        </main>
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
    onDeleteLodge: id => dispatch(actionCreators.deleteLodge(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)