const Stripe = require('stripe')

const stripeLineItems = require('./helpers/stripeLineItems.js')
const stripePaymentMetadata = require('./helpers/stripePaymentMetadata.js')

const stripe = new Stripe(process.env.GATSBY_STRIPE_SECRET)

exports.handler = async (event, context, callback) => {
  const { values, prices } = JSON.parse(event.body)

  const subscriptionOrPaymentMode = (
    values.companyAddress.proAddress === 'Yes' || 
    values.registeredAgent.proRegisteredAgent === 'Yes' 
      ? 'subscription' 
      : 'payment'
  )

  const metaData = (
    values.companyAddress.proAddress === 'Yes' ||
    values.registeredAgent.proRegisteredAgent === 'Yes' 
      ? {subscription_data: {metadata: stripePaymentMetadata(values)}}
      : {payment_intent_data: {metadata: stripePaymentMetadata(values)}}
  )

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems(values, prices),
      payment_method_types: ['card'],
      mode: subscriptionOrPaymentMode,
      success_url: 'http://prollc.com/exito',
      cancel_url: 'http://prollc.com/crear-empresa',
      ...metaData,
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true
      },
      locale: 'es'
    })
    return {
      statusCode: 200,
      body: JSON.stringify({url: session.url})
    }
  } catch (error) {
    console.error(error)
  }
}