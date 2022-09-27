import React from 'react';
import './Orders.css';
import { v4 as uuidV4} from 'uuid'

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div key={uuidV4()} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={uuidV4()}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;