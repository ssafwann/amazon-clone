import React, { useState } from "react";
import "../Order.css";
import CheckoutProduct from "./CheckoutProduct";
import moment from "moment"; // ! really good for passing data stamps (npm install moment)
import CurrencyFormat from "react-currency-format";

// a single order prop is passed from Orders.js
function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100} // we pass the data in sub units so divide it by 100 to get it back into a proper format
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
