import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "../Payment.css";
import { useStateValue } from "../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
import { db } from "../firebase";

function Payment() {
  const [{ user, basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // ! loads when the payment componenet loads, or when the variables insid [] changes
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a secret
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // ?total because its a query parameter
        // also stripe expects the total in a currencies subunits so we * 100
        url: `/payments/create?total=${Math.trunc(
          getBasketTotal(basket) * 100
        )}`,
      });
      // when we get the response back we should have the client secret
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true); // this stops processing the buy button more than once

    // ! this is a promise
    // the client secret is how stripe knows how much we will charge and stuff
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      // paymentIntent means payment confirmation
      .then(({ paymentIntent }) => {
        // the document we are accessing users, their id and then inside that we are going inside the collection of the orders and then go into the documenet and use the payment id as the order id aand then .set takes an object which passes the basket item and amount and created which gives a timestamp of when the order was created

        // ! SENDING DATA TO DATBASE
        db.collection("users")
          .doc(user?.uid) //
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        // if the payment was succesful
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders"); // ! change to history.replace('/orders')
      });
  };

  const handleChange = (event) => {
    // listen for changes in the CardElement
    // and display any errors as the customer types their credit card details

    setDisabled(event.empty); //if event is empty disable the button
    setError(event.error ? event.error.message : ""); // if error show error otherwise nothing
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* delivery address*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* review items*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
              />
            ))}
          </div>
        </div>
        {/* payment method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe stuff will go here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
