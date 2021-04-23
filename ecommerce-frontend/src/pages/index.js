import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import {graphql} from 'gatsby'
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

import {formatPrice} from '../utils/format'
import {fromProductSlugToUrl}  from '../utils/products'

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h2>Shop</h2>
    <div style={{
        display:'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '20px'
    }}>
      {data.allStrapiProduct.nodes.map(product => (
        <Link to={fromProductSlugToUrl(product.slug)}
              style={{
                color:'#000',
                textDecoration: 'none'
              }}
        >
          <div>
            <div>
              <Img fixed={product.thumbnail.childImageSharp.fixed} />
            </div>
            <h3 style={{marginBottom: 0}}>{product.name}</h3>
            {formatPrice(product.price_in_cent)}
          </div>
        </Link>
      ))}
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query MyQuery{
    allStrapiProduct {
      nodes {
        id
        description
        name
        price_in_cent
        strapiId
        slug
        created_at
        thumbnail {
          childImageSharp {
            fixed(width: 300, height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
