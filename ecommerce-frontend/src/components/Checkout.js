import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import CheckoutForm from'./CheckoutForm'

const stripe = loadStripe('pk_test_wwlwZBZMZrwZfPh56jxx3z2t00jy1aev9k')

export default () => (
    <div>
        <Elements stripe={stripe}>
            <CheckoutForm />
        </Elements>
    </div>
)