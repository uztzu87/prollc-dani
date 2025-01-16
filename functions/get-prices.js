const Stripe = require('stripe')

const stripe = new Stripe(process.env.GATSBY_STRIPE_SECRET)

exports.handler = async (event, context, callback) => {
  try {
    const res = await stripe.prices.list({active: true, limit: 100})
    return {
      statusCode: 200,
      body: JSON.stringify({prices: res.data})
    }
  } catch (error) {
    console.error(error)
  }
}