import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount = () => {
    this.props.onInitIngredients()
  }

  purchaseCancelHandler = () => this.setState({ purchasing: false })

  purchaseHandler = () => this.setState({ purchasing: true })

  render() {
    const disabledInfo = { ...this.props.ingredients }

    for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 }

    let orderSummary = null

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredients={Object.keys(this.props.ingredients)}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.props.purchasable}
            purchased={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={() => this.props.history.push('/checkout')}
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
      />
    }

    return (
      <Auxiliary>
        <Modal
          closeModal={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch(burgerBuilderActions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
