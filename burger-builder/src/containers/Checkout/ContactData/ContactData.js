import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: "",
        validation: {
          required: true,
          minLength: 4
        },
        valid: false,
        touched: false
      },
      street: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      zipCode: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your ZIP code',
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      country: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your country',
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your email',
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        type: 'select',
        config: {
          options: [{ value: 'fastest' }, { value: 'cheapest' }]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  submitHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let i in this.state.orderForm) {
      formData[i] = this.state.orderForm[i].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      contactData: formData
    }
    this.props.onOrderBurger(order)
  }

  checkValidity(value, inputRules) {
    let isValid = true;
    if (inputRules) {
      const allRules = {
        required: value.trim() !== '',
        minLength: value.trim().length >= inputRules.minLength
      }
      for (let rule in inputRules) {
        if (rule && !allRules[rule]) {
          isValid = false
        }
      }
    }
    return isValid
  }


  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      const newState = { ...prevState }
      newState.orderForm[name].value = value
      newState.orderForm[name].touched = true
      newState.orderForm[name].valid = this.checkValidity(value, prevState.orderForm[name].validation)
      newState.formIsValid = Object.values(newState.orderForm)
        .every(input => input.valid)
      return newState
    })
  }

  render() {
    const formElements = Object.entries(this.state.orderForm).map(input => (
      <Input
        key={input[0]}
        name={input[0]}
        value={input[1].value}
        type={input[1].type}
        config={input[1].config}
        change={this.inputChangeHandler}
        invalid={!input[1].valid}
        shouldValidate={input[1].validation}
        touched={input[1].touched}
      />
    ))

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElements}
        <Button
          disabled={!this.state.formIsValid}
          type="Success"
        >ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: data => dispatch(actions.purchaseBurger(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))