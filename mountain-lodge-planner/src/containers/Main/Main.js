import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AddLodge from '../AddLodge/AddLodge'
import AllLodges from '../../components/AllLodges/AllLodges';
import EditLodge from '../../components/EditLodge/EditLodge';

import classes from './Main.module.css'

class Main extends Component {
  render() {
    let output = (
      <main className={classes.Main}>
        <Switch>
          <Route
            exact
            path="/all-lodges"
            component={() => <AllLodges />}
          />
          <Route
            path="/add-lodge"
            component={props => <AddLodge {...props} />}
          />
          <Route
            path="/edit/:id"
            component={props => <EditLodge {...props} />}
          />
          <Redirect from='/' to='all-lodges' />
        </Switch>
      </main>
    )

    return output
  }
}

export default (Main)