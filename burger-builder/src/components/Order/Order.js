import React from 'react'
import classes from './Order.module.css'

const order = props => {
  const ingredients = Object.entries(props.ingredients).map(item => {
    return <span className={classes.ingredient} key={item[0]}>{item[0]} ({item[1]})</span>
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients} </p>
      <p>Price: <strong>€{parseInt(props.price).toFixed(2)}</strong></p>
    </div>
  )

}

export default order