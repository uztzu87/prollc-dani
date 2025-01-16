import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import '../../styles/plans/bankAccount.scss'

import StepHeader from './stepHeader'
import EIN from './addons/ein'

import CheckIcon from '../../images/svgs/check-icon.svg'

import displayStripePrice from '../../helpers/displayStripePrice'

export default function BankAccount(props) {
  const { addons } = props.formik.values

  const handleChange = (e) => {
    if (e.target.name === 'addons.bankAccount' && e.target.value) {
      props.formik.setFieldValue('ein.firstName', '')
      props.formik.setFieldValue('ein.secondName', '')
      props.formik.setFieldValue('ein.lastName', '')
      props.formik.setFieldValue('ein.ssn', '')
      props.formik.setFieldValue('ein.itin', '')
    }

    props.formik.setFieldValue('addons.ein', e.target.checked)
    props.formik.handleChange(e)
  }

  return (
    <div className='bankAccount'>
      <StepHeader 
        title='Cuenta Bancaria'
        details='¡Abrir tu Cuenta en Estados Unidos a Distancia!'
      />
        <div className='bankAccount__bank-details'>
          <div className='bankAccount__bank-details-features'>
            <h4>Beneficios</h4>
            <ul>
              <li><CheckIcon />Cobrar en dólares</li>
              <li><CheckIcon />Facturar desde los EE. UU.</li>
              <li><CheckIcon />Estabilidad económica</li>
              <li><CheckIcon />Acceder las plataformas de venta como Amazon y Stripe</li>
              <li><CheckIcon />Tener un merchant account</li>
              <li><CheckIcon />Asegurarte de que cumples al 100% con las normas de funcionamiento de la LLC</li>
              <li><CheckIcon />No mezclar tus fondos personales con los de la compañía</li>
              <li><CheckIcon />Respetar la personalidad jurídica de la compañía, ya que no es recomendable cobrarle a tus clientes usando tu cuenta bancaria personal</li>
            </ul>
          </div>
          <div className='bankAccount__bank-details-image'>
            <StaticImage src='../../images/bank.jpg' alt='bank' />
          </div>
        </div>
        <div className={`bankAccount__addon ${addons.bankAccount && 'bankAccount__addon--selected'}`}>
          <div className='bankAccount__addon-title-inner-ctr'>
            <div className='bankAccount__addon-select'>
              <input
                type='checkbox'
                name='addons.bankAccount'
                onChange={handleChange}
                checked={addons.bankAccount}
                value={addons.bankAccount}
              />
            </div>
            <div className='bankAccount__addon-title'>
              <h3>Cuenta Bancaria</h3>
              <p>Número de Identificación Tributaria incluido (valor de $89)</p>
              <p className='bankAccount__addon-title-notice'>Aviso: Debe tener pasaporte válido y visa de entrada válida</p>
            </div>
            <div className='bankAccount__addon-price'>
              ${displayStripePrice(props.prices.bankAccount)}
            </div>
          </div>
          {addons.bankAccount && <div className='bankAccount__addon-details'>
              <EIN {...props} />
            </div>}
        </div>
    </div>
  )
}
