/**
 * Formats a integer price into a price with decimals with a preceding $ sign
 * @parmas {string} - priceWithDecimals representation of price
 */
export const formatPrice = (priceWithDecimal) => {
    const realPrice = parseInt(priceWithDecimal) / 100
    return realPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}