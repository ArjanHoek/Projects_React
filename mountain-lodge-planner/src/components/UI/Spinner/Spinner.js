import React from 'react'
import classes from './Spinner.module.css'

const spinner = props => (
  <div className={classes.SpinnerWrapper}>
    <div className={classes.Spinner}></div>
    <h3 className={classes.Text}>{props.children}</h3>
  </div>
)

export default spinner