import React,  {useState, useCallback} from 'react'
import Img from 'gatsby-image'

import {getCart, addToCart, cartSubtotal, cartTotal, shouldPayShipping, SHIPPING_RATE} from '../utils/cart'

import {formatPrice} from '../utils/format'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => {
    const cart = getCart()
    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])
    return (
        <Layout>
            <SEO title="Cart" />
            <table>
                <thead>
                    <tr>
                        <th>
                            Product
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr>
                            <td>
                                <Img 
                                    style={{width: '100px', height: '100px', verticalAlign: 'middle'}}
                                    fixed={product.thumbnail.childImageSharp.fixed} 
                                />
                                <span style={{marginLeft: '14px', whiteSpace: 'nowrap'}}>{product.name}</span>
                            </td>
                            <td>
                                {formatPrice(product.price_in_cent)}
                            </td>
                            <td style={{textAlign: 'center'}}>
                                <span onClick={() => {
                                    addToCart(product, -1)
                                    forceUpdate()
                                }}>-</span>
                                {product.qty}
                                <span onClick={() => {
                                    addToCart(product, 1)
                                    forceUpdate()
                                }}>+</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Subtotal: {formatPrice(cartSubtotal(cart))}</h3>
            {shouldPayShipping(cart) &&
                <h3>Shipping: {formatPrice(SHIPPING_RATE)}</h3>
            }
            {!shouldPayShipping(cart) &&
                <h3>Shipping is free! </h3>
            }
            <h3>Total: {formatPrice(cartTotal(cart))}</h3>
        </Layout>
    )
}
