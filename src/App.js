import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./Components/Footer";

const promise = loadStripe(
  "pk_test_51KWDzfJ5dQPJ09mlq6oZWi4urYeorDAoxPompT1QC44YG1wWjT6X15J8yecKWc6yE6AEvPgYKgLhfIz78BESVG2O00RiZXFUex"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // this will only run once when the app componenet loads if u keep [] empty if you put somethingn like basket then it run everytime the basket changes

    // this is like a listener, whenever the authentication changes it gives us the user
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      // the user just logged in / was logged in already
      if (authUser) {
        // this shoots off the event and sends the user info to the data layer
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        // the user is logged out
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      {/* BEM NAMING CONVENTION */}
      <div className="app">
        {/* you can put component outside the route if u want to render it in every page */}
        <Routes>
          {/* when i am at a certain path render these componenets*/}
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Nav />
                <Orders />
                <Footer />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Nav />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Nav />
                <Checkout />
              </>
            }
          />
          {/* default root should always be at the bottom */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Nav />
                <Home />
                <Footer />
              </>
            }
          />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
