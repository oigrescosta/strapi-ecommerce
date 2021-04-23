import React, {useState} from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import {formatPrice} from '../utils/format'
import {addToCart} from '../utils/cart'

const ProductTemplate = ({data}) => {

    const [qty, setQty] = useState(1)

    console.log("ProductTemplate.render data", data)
    return (
        <Layout>
            {console.log("ProductTemplate.render data", data)}
            <Img fixed={data.strapiProduct.thumbnail.childImageSharp.fixed} />
            <h2>{data.strapiProduct.name}</h2>
            <p>{data.strapiProduct.description}</p>
            <p>Price: {formatPrice(data.strapiProduct.price_in_cent)}</p>
            <input 
                type="number" 
                value={qty} 
                onChange={(event) => setQty(event.target.value)}
            />
            <button 
                onClick={() => addToCart(data.strapiProduct, qty)}
                style={{fontSize: '20px', padding: '24px', borderRadius: '2px'}}>
                Add to Cart
            </button>
        </Layout>
    )
}

export default ProductTemplate

export const query = graphql`
    query ProductTemplateQuery($id: String!) {
        strapiProduct(id: {eq: $id}) {
            strapiId
            name
            price_in_cent
            description
                thumbnail {
                    childImageSharp {
                        fixed(width: 640) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
    }
`