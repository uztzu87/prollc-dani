import React from 'react'

import calcPrice from '../../helpers/calcPrice'

import StepHeader from './stepHeader'
import Loading from '../../components/ui/loading.js'

import '../../styles/plans/checkout.scss'

const Checkout = (props) => {
  const { values } = props.formik
  const { prices } = props

  let isRecurring = false
  let recurringPrice = 0
  if (values.companyAddress.proAddress === 'Yes') {
    isRecurring = true
    recurringPrice += prices.proAddress.unit_amount / 100
  }
  if (values.registeredAgent.proRegisteredAgent === 'Yes') {
    isRecurring = true
    recurringPrice += prices.proRegisteredAgent.unit_amount / 100
  }

  return (
    props.submitting 
      ? <div className='checkout'><Loading /></div>
      : <div className='checkout'>
          <StepHeader title='Total' />
          <div className='checkout__total'>
            <div className='checkout__total-price-ctr'>
            <p className='checkout__total-price'>
              ${calcPrice(props.formik.values, prices)}<span>USD</span>
            </p>
            {isRecurring && 
            <p className='checkout__total-recurring'>
              luego ${recurringPrice} / año
            </p>}
            </div>
          </div>
          <button
            className='checkout__checkout-btn' 
            type='submit' 
            disabled={props.submitting}
          >
            Finalizar y Pagar
          </button>
        </div>
  )
}

export default Checkout
