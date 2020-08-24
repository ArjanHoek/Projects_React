import React, { Component } from 'react';
import classes from './Header.module.css'
import NavBar from '../NavBar/NavBar'

class Header extends Component {
  state = { showNav: false }

  showNavBar = () =>
    this.setState(prevState => { return { showNav: !prevState.showNav } })

  render() {
    const menuIcon = <i
      onClick={this.showNavBar}
      className={`fas fa-${this.state.showNav
        ? 'chevron-left'
        : 'bars'} fa-2x`}></i>

    return (
      <header className={classes.Header}>
        {menuIcon}
        <h1>Austrian Mountain Lodges</h1>
        <NavBar
          showNavBar={this.showNavBar}
          show={this.state.showNav}
        />
      </header>
    )
  }

}

export default Header