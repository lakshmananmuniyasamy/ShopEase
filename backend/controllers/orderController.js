const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { totalAmount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: 'inr',
        });

        // console.log("paymentIntent",paymentIntent)
        res.json({ success: true,  clientSecret: paymentIntent.client_secret, });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.confirmOrder = async (req, res) => {
    const { userId,products,totalAmount,paymentIntent } = req.body;
    console.log("body",req.body);
    try {
        const order = await Order.create({
            userId,
            products,
            totalAmount,
            paymentIntentId: paymentIntent
        });


        // console.log("order",order)
        res.json({ success: true,  order,message: "order success" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};