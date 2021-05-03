export const TAX_RATE = process.env.TAX_RATE || 0.1
export const FREE_SHIPPING_THRESHOLD = process.env.FREE_SHIPPING_THRESHOLD || 10000
export const SHIPPING_RATE = process.env.SHIPPING_RATE || 500

export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
    try {   
        const cart = JSON.parse(localStorage.getItem('cart'))
        if(cart) {
            return cart
        }
    } catch(err) {

    }

    return []
}

export const cartSubtotal = (cart) => {
    //Sum up all of the individual product costs
    const subTotal = cart.reduce((counter, product) => {
        return counter + product.price_in_cent * product.qty
    }, 0)

    return subTotal
}

export const shouldPayShipping = (cart) => {
    const subTotal = cartSubtotal(cart)
    
    return subTotal < FREE_SHIPPING_THRESHOLD
}

export const cartTotal = (cart) => {
    if(cart.lenght === 0 ){
        return 0
    }
    
    const subTotal = cartSubtotal(cart)

    const shipping = shouldPayShipping(cart) ? SHIPPING_RATE : 0

    const total = subTotal + subTotal * TAX_RATE + shipping

    return Math.round(total)
}

export const addToCart = (product, qty = 1) => {
    const cart = getCart()

    //if the product is already there
    const indexOfProduct = cart.findIndex((alreadyInCart) => {
        return alreadyInCart.strapiId === product.strapiId
    })
    console.log(indexOfProduct)

    if(indexOfProduct !== -1) {
        //Update the quantity
        cart[indexOfProduct].qty += parseInt(qty)

        if(cart[indexOfProduct].qty === 0) {
            //Remove the product from the cart
            cart.splice(indexOfProduct, 1)
        }

    } else {
        //Set the qty 1
        product.qty = parseInt(qty)

        //Push the product
        cart.push(product)
    }

    setCart(cart)
}

