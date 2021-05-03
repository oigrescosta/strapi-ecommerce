import React, {useEffect, useState} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
    const stripe = useStripe()
    const Elements = useElements()

    const [token, setToken] = useState(null)
    const [total, setTotal] = useState('loading')

    const handleSubmit = (event) => {
        console.log("HandleSubmit", event)
    }

    useEffect(() => {
        const loadToken = async () => {
            const response = await fetch('http://localhost:1337/orders/payment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cart: [
                        {id: 1, qty: 1},
                        {id: 3, qty: 3}
                    ]
                })
            })

            const data =  await response.json()

            console.log("loadToken data", data)
            setToken(data.client_secret)
            setToken(data.amount)
        }

        loadToken()
    })

    if(token) {
        return (
            <div>
                <h3>Total: {total}</h3>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    <button disabled={!stripe}>Buy it</button>
                </form>
            </div>
        )
    } else {
        return(
            <p>Loading</p>
        )
    }
}

export default CheckoutForm
