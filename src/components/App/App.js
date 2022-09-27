import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  addOrder = (newOrder) => {
    postOrders(newOrder)
    .then(() => {
      getOrders()
        .then(response => this.setState({
          orders: response.orders
        }))
          .catch(err => console.error('Error fetching:', err));
    })
    .catch(err => console.error('Error posting:', err));
  }

  componentDidMount() {
    getOrders()
    .then(response => this.setState({
      orders: response.orders
    }))
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
