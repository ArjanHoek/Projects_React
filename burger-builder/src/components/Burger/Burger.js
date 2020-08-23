import React from 'react';
import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const Burger = props => {
  const ingredients = Object.entries(props.ingredients)
    .map(ing => [...Array(ing[1])].map((_, i) =>
      <BurgerIngredient key={ing[0] + i} type={ing[0]} />))
    .reduce((all, cur) => all.concat(cur), [])

  const message = <p>Please add ingredients</p>

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients.length ? ingredients : message}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
