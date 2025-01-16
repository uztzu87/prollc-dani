const calcPrice = (values, prices) => {

  const selections = {
    proAddress: 0,
    proRegisteredAgent: 0,
    ein: 0,
    sCorporation: 0,
    attorneyConsultation: 0,
    bankAccount: 0,
    expedited: 0
  }

  values.companyAddress.proAddress === 'Yes' 
    ? selections.proAddress = prices.proAddress.unit_amount / 100
    : selections.proAddress = 0

  values.registeredAgent.proRegisteredAgent === 'Yes'
    ? selections.proRegisteredAgent = prices.proRegisteredAgent.unit_amount / 100
    : selections.proRegisteredAgent = 0

  // prices argument obj props and selections obj props must match values obj props
  for (const prop in values.addons) {
    values.addons[prop] 
      ? selections[prop] = prices[prop].unit_amount / 100
      : selections[prop] = 0
  }

  // ein included with bank account
  if (values.addons.bankAccount) selections.ein = 0

  let price = prices.base.unit_amount / 100
  for (const selection in selections) {
    price += selections[selection]
  }

  return price
}

export default calcPrice
