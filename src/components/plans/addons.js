import React from 'react'

import '../../styles/plans/addons.scss'

import displayStripePrice from '../../helpers/displayStripePrice'

import StepHeader from './stepHeader'
import EIN from './addons/ein'

export default function Addons(props) {
  const { addons } = props.formik.values

  const handleChange = (e) => {
    if (e.target.name === 'addons.ein' && e.target.value) {
      props.formik.setFieldValue('ein.firstName', '')
      props.formik.setFieldValue('ein.secondName', '')
      props.formik.setFieldValue('ein.lastName', '')
      props.formik.setFieldValue('ein.ssn', '')
      props.formik.setFieldValue('ein.itin', '')
    }

    props.formik.handleChange(e)
  }

  return (
    <div>
      <StepHeader title='Complementos' />
      <div className={`addons__addon ${addons.ein && 'addons__addon--selected'}`}>
        <div className='addons__addon-title-inner-ctr'>
          <div className='addons__addon-select'>
            <input
              type='checkbox'
              name={`addons.ein`}
              onChange={handleChange}
              checked={addons.ein}
              value={addons.ein}
              disabled={addons.bankAccount}
            />
          </div>
          <div className='addons__addon-title'>
            <h3>Número de Identificación Tributaria</h3>
            <p>
              El número de identificación tributaria (EIN, por sus siglas en inglés) es un número con el que las autoridades tributarias identifican a las LLC. Es un requisito necesario para abrir una cuenta bancaria a nombre de la compañía.
            </p>
          </div>
          <div className='addons__addon-price'>
            {addons.bankAccount 
              ? <div className='addons__addon-price-included'>Incluido con Cuenta Bancaria</div>
              : `$${displayStripePrice(props.prices.ein)}`
            }
          </div>
        </div>
        {(addons.ein && !addons.bankAccount) && <div className='addons__addon-details'>
          <EIN {...props} />
        </div>}
      </div>
      <div className={`addons__addon ${addons.sCorporation && 'addons__addon--selected'}`}>
        <div className='addons__addon-title-inner-ctr'>
          <div className='addons__addon-select'>
            <input
              type='checkbox'
              name={`addons.sCorporation`}
              onChange={handleChange}
              checked={addons.sCorporation}
              value={addons.sCorporation}
            />
          </div>
          <div className='addons__addon-title'>
            <h3>Clasificar tu compañía como Corporación-S</h3>
            <p>
              La Corporación S es una clasificación tributaria en la que la
              compañía opta por pasar los ingresos, pérdidas, deducciones y créditos a
              través de sus dueños, a efectos del impuesto federal.
              Esto permite a las S-Corp evitar la doble imposición sobre los ingresos
              de la corporación.
            </p>
            <p className='addons__addon-title-notice'>
              Aviso: Solo disponibles para residentes fiscales o ciudadanos estadounidenses
            </p>
          </div>
          <div className='addons__addon-price'>
            ${displayStripePrice(props.prices.sCorporation)}
          </div>
        </div>
      </div>
      <div className={`addons__addon ${addons.attorneyConsultation && 'addons__addon--selected'}`}>
        <div className='addons__addon-title-inner-ctr'>
          <div className='addons__addon-select'>
            <input
              type='checkbox'
              name={`addons.attorneyConsultation`}
              onChange={handleChange}
              checked={addons.attorneyConsultation}
              value={addons.attorneyConsultation}
            />
          </div>
          <div className='addons__addon-title'>
            <h3>Consultar con un abogado</h3>
            <p>Consulta de 30 minutos sobre estructura fiscal y empresarial.</p>
          </div>
          <div className='addons__addon-price'>
            ${displayStripePrice(props.prices.attorneyConsultation)}
          </div>
        </div>
      </div>
      <div className={`addons__addon ${addons.expedited && 'addons__addon--selected'}`}>
        <div className='addons__addon-title-inner-ctr'>
          <div className='addons__addon-select'>
            <input
              type='checkbox'
              name={`addons.expedited`}
              onChange={handleChange}
              checked={addons.expedited}
              value={addons.expedited}
            />
          </div>
          <div className='addons__addon-title'>
            <h3>Servicio rápido</h3>
            <p>Documentos presentados a la División de Corporaciones dentro de 24 horas.</p>
          </div>
          <div className='addons__addon-price'>
            ${displayStripePrice(props.prices.expedited)}
          </div>
        </div>
      </div>
    </div>
  )
}
