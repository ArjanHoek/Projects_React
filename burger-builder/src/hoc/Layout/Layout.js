import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = { showSideDrawer: false }

  sideDrawerCloseHandler = () =>
    this.setState({ showSideDrawer: false })

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar
          toggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }

};

export default Layout;
