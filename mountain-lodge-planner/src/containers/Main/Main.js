import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from '../../axios'

import AddLodge from '../AddLodge/AddLodge'
import AllLodges from '../../components/AllLodges/AllLodges';
import EditLodge from '../../components/EditLodge/EditLodge';
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Main.module.css'

class Main extends Component {
  state = { lodges: [], loading: true, loadingMessage: 'Loading...' }

  componentDidMount() { this.updateData() }

  deleteLodge = delID => {
    if (window.confirm('Are you sure?')) {
      this.setLoading('Deleting data...')
      axios.get('/lodges.json')
        .then(res => {
          if (res.data[delID].adjacentLodges) {
            res.data[delID].adjacentLodges.forEach(adjID => {
              const adjLodge = res.data[adjID.id]
              if (adjLodge) {
                adjLodge.adjacentLodges = adjLodge.adjacentLodges
                  .filter(adjLodge => adjLodge.id !== delID)
              }
            })
          }
          delete res.data[delID]
          axios.put('/lodges.json', res.data)
            .then(() => this.updateData())
        })
      return true
    }
    return false
  }

  updateData = (altLoadingMessage) => {
    this.setLoading(altLoadingMessage || 'Importing data...');
    setTimeout(() => {
      axios.get('/lodges.json')
        .then(res => {
          this.setState({
            loading: false,
            lodges: res.data && Object.entries(res.data)
              .map(lodge => ({ ...lodge[1], id: lodge[0] }))
              .sort((a, b) => this.compare(a.name, b.name))
          })
          return true;
        })
    }, 500);
    return false
  }

  setLoading = (loadingMessage) => {
    const loading = loadingMessage ? true : false;
    this.setState({ loadingMessage, loading });
    return true
  }

  compare = (a, b) => a > b ? 1 : a < b ? -1 : 0

  render() {
    let output = <Spinner>{this.state.loadingMessage}</Spinner>

    if (!this.state.loading) {
      output = (
        <main className={classes.Main}>
          <Switch>
            <Route
              exact
              path="/all-lodges"
              component={() =>
                <AllLodges
                  updateData={this.updateData}
                  lodges={this.state.lodges}
                  deleteLodge={this.deleteLodge}
                />
              }
            />
            <Route
              path="/add-lodge"
              component={props =>
                <AddLodge
                  {...props}
                  updateData={this.updateData}
                />
              }
            />
            <Route
              path="/edit/:id"
              component={props =>
                <EditLodge {...props}
                  deleteLodge={this.deleteLodge}
                  updateData={this.updateData}
                  lodges={this.state.lodges}
                  setLoading={this.setLoading}
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

export default Main