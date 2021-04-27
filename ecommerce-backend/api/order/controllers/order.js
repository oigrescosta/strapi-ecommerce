'use strict';
const stripe = require('stripe')('sk_test_WcmZdHen56ef1qnbEV3CDobj00grxjlNZd')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    setUpStripe: async (ctx) => {
        let total = 100
        let validatedcart = []
        let receiptCard = []

        //Through ctx.request.body
        //We will receive the products and the qty
        const {cart} = ctx.request.body

        await Promise.all(cart.map(async product => {
            const validatedProduct = await strapi.services.product.findOne({
                id: product.id
            })

            console.log("validatedProduct", validatedProduct)
            if(validatedProduct) {
                validatedProduct.qty = product.qty

                validatedcart.push(validatedProduct)

                receiptCard.push({
                    id: product.id,
                    qty: product.qty
                })
            }
        }))

        console.log("validatedcart", validatedcart)

        //Only the Id of each product

        //Use the data from to calculate the price of each product
        //Basically calculate the total that way

        total = strapi.config.functions.cart.cartTotal(validatedcart)

        console.log("total", total)

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'eur',
                payment_method_types: ['card'],
                metadata: {cart: JSON.stringify(receiptCard)}
            });
    
            return paymentIntent
        } catch(err) {
           return {error: err.raw.message} 
        }
    }
};
