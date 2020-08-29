import React from 'react';
import classes from './HeadingSecondary.module.css'

const HeadingSecondary = props => {
  return (
    <h2 className={classes.HeadingSecondary}>
      {props.children}
    </h2>
  )
}

export default HeadingSecondary