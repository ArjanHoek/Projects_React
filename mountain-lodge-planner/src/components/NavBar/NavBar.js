import React from 'react'
import { Link } from 'react-router-dom'

import classes from './NavBar.module.css'

const NavBar = props => {
  let addClasses = [classes.NavBar, classes.hide];
  props.show && addClasses.pop()

  const navBar = (
    <nav className={addClasses.join(' ')}>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link onClick={props.showNavBar} to="/all-lodges">All Lodges</Link>
        </li>
        <li>
          <Link onClick={props.showNavBar} to="/add-lodge">Add New Lodge</Link>
        </li>
      </ul>
    </nav>
  )

  return navBar
}

export default NavBar