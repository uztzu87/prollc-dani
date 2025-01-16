const displayStripePrice = (stripePrice) => {
  const { unit_amount, recurring } = stripePrice

  return recurring
    ? `${(unit_amount / 100)} / año`
    : `${(unit_amount / 100)}`
}

export default displayStripePrice