require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
//enable CORS
app.use(cors());
//  parse incoming request bodies that are in the JSON format
app.use(express.json());

const array = [];
const calculateOrderAmount = (items) => {
    items.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
    });
    //return total amount
    const totalAmount = array.reduce((a, b) => a + b, 0);

    return totalAmount * 100;
};

app.post("/create-payment-intent", async(req, res) => {
    const { items, shipping, description } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
        description,
        shipping: {
            address: {
                line1: shipping.line1,
                line2: shipping.line2,
                city: shipping.city,
                country: shipping.country,
                postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
        },
        //   receipt_email: customEmail
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

const port = process.env.port || 4242;
app.listen(port, () => console.log(`Node server listening on port ${port}`));