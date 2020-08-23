import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = props => {
  const controls = props.ingredients
    .map(ing => { return { label: ing, type: ing } })

  const controlComponents = controls.map(ctrl => (
    <BuildControl
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      key={ctrl.label}
      label={ctrl.label}
      disabled={props.disabled[ctrl.type]}
    />
  ))

  return (
    <div className={classes.BuildControls}>
      <p>CurrentPrice: <strong>{props.price.toFixed(2)}</strong></p>
      {controlComponents}
      <button
        onClick={props.purchased}
        disabled={!props.purchasable}
        className={classes.OrderButton}>Order Now</button>
    </div>
  )
}

export default buildControls