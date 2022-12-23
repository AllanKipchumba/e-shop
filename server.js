require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
//enable CORS
app.use(cors());
//  parse incoming request bodies that are in the JSON format
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to eShop website");
});

const port = process.env.port || 4242;
app.listen(port, () => console.log(`Node server listening on port ${port}`));