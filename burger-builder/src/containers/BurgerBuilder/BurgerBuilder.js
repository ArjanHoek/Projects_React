import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  // componentDidMount() {
  //   axios
  //     .get('https://my-react-burger-app-proj01.firebaseio.com/ingredients.json')
  //     .then(res => this.setState({ ingredients: res.data }))
  //     .catch(err => this.setState({ error: true }))
  // }

  purchaseCancelHandler = () => this.setState({ purchasing: false })

  purchaseHandler = () => this.setState({ purchasing: true })

  render() {
    const disabledInfo = { ...this.props.ingredients }

    for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 }

    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

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

    if (this.state.loading) { orderSummary = <Spinner /> }

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
    purchasable: state.purchasable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      payload: { ingredient, price: INGREDIENT_PRICES[ingredient] }
    }),
    onRemoveIngredient: (ingredient) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      payload: { ingredient, price: INGREDIENT_PRICES[ingredient] }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
