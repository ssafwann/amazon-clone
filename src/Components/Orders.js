import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import "../Orders.css";
import { useStateValue } from "../StateProvider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]); // initial valaue of empty array

  useEffect(() => {
    // accessing user collection then u get the specific user thats logged in at that time
    // then u access that users particular order // then inside that collection u order all of their orders by a descending orders using created which is order date
    // snapshot then goes through like ur order list (each order is like a document) and u map through all of them
    // u get the id of that and store in id and u get the data which is the basket and u store in the data key.
    // and basically ur oders state array will contain all of those orders

    // if user exists
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]); // because we are using an outside variable so we have to put user in []

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <p>{!user ? "Please create an account to save orders" : ""}</p>
      <div className="orders__order">
        {/* map through all the orders and just give us a single order componenet */}
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
