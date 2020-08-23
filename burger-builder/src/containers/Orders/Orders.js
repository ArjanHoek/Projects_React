import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map(id => {
          return { id, ...res.data[id] }
        })
        this.setState({
          orders, loading: false
        })
      })
  }

  componentDidUpdate() {
    console.log(this.state.orders);
  }

  render() {
    let orders = <Spinner />

    if (!this.state.loading) {
      orders = this.state.orders.map(order => {
        return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      })
    }

    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)