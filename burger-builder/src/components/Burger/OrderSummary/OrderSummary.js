import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.entries(props.ingredients).map(entry => (
    <li key={entry[0]}>
      <span style={{ textTransform: 'capitalize' }}>
        {entry[0]}
      </span>
      : {entry[1]}
    </li>
  ))
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button
        click={props.purchaseCancelled}
        type="Danger"
      >Cancel</Button>
      <Button
        click={props.purchaseContinued}
        type="Success"
      >Continue</Button>

    </Auxiliary>
  )
}

export default orderSummary