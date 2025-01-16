const stripeLineItems = (values, prices) => {

  const { fileState } = values
  const { proAddress } = values.companyAddress
  const { proRegisteredAgent } = values.registeredAgent
  const { ein, sCorporation, bankAccount, attorneyConsultation, expedited } = values.addons

  const lineItems = {}

  for (const prop in prices) {
    lineItems[prop] = {price: prices[prop].id, quantity: 1}
  }

  lineItems.base.description = fileState
  
  const lineItemsArr = [lineItems.base]

  proAddress === 'Yes' && lineItemsArr.push(lineItems.proAddress)
  proRegisteredAgent === 'Yes' && lineItemsArr.push(lineItems.proRegisteredAgent)
  sCorporation && lineItemsArr.push(lineItems.sCorporation)
  bankAccount && lineItemsArr.push(lineItems.bankAccount)
  attorneyConsultation && lineItemsArr.push(lineItems.attorneyConsultation)
  expedited && lineItemsArr.push(lineItems.expedited)
  if (ein && !bankAccount) lineItemsArr.push(lineItems.ein) // ein is included with bank account

  return lineItemsArr
}

module.exports = stripeLineItems