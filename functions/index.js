// THIS THE BACKEND EXPRESS APP
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KWDzfJ5dQPJ09mlPCjc0EoQhMZbzTC6VoZQ2SrYgoSD2i29RZL72101iEWIZeUzP2H4vGjNypC0GjcdUmoJRgVJ00AeaRLVHM"
); // ('') contains our secret key

// ! all the stuff below is to set an API (config, middlewares, api routes, listen command)
// App config
const app = express(); 

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json()); // this allows to send and pass data into json format

// API routes
app.get("/", (request, response) => response.status(200).send("hello world")); // this is just a dummy route, to test if everything works

app.post("/payments/create", async (request, response) => {
  const total = request.query.total; // this is the basket total (in subunits)

  console.log("Payment Request Received BOOM!!!!", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created response
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command (this is the set up needed to get the backend express running on a cloud function)
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-66761/us-central1/api
