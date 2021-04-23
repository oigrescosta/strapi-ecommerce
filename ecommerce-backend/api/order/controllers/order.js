'use strict';
const stripe = require('stripe')('sk_test_WcmZdHen56ef1qnbEV3CDobj00grxjlNZd')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    setUpStripe: async (ctx) => {
        let total = 0
        let cart = []
        //Through ctx.request.body
        //We will receive the products and the qty

        //Only the Id of each product

        //Use the data from to calculate the price of each product
        //Basically calculate the total that way

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000,
            currency: 'eur',
            payment_method_types: ['card'],
            metadata: {cart: JSON.stringify(cart)}
        });

        return paymentIntent
    }
};
