// TODO: delete this?

import React from 'react'

import StepHeader from './stepHeader'

import '../../styles/plans/sElection.scss'

const SElection = (props) => {
  const { sElection } = props.formik.values
  const { handleChange } = props.formik

  return (
    <div className='sElection'>
      <StepHeader
        title='¿Deseas clasificar tu compañía como Corporación-S?'
        details={<>La Corporación S es una clasificación tributaria en la que la
        compañía opta por pasar los ingresos, pérdidas, deducciones y créditos a
        través de sus dueños, a efectos del impuesto federal.
        Esto permite a las S-Corp evitar la doble imposición sobre los ingresos
        de la corporación. No obstante, es una figura corporativa <span style={{fontWeight: 'bold'}}>solo
        disponibles para residentes fiscales o ciudadanos estadounidenses.</span></>}
      />
      <fieldset>
        <div className='sElection__input-ctr'>
          <input
            type='radio'
            name='sElection'
            id='sElection__input-no'
            value='No'
            checked={sElection === 'No'}
            onChange={handleChange}
          />
          <label htmlFor='sElection__input-no'>
            No
          </label>
        </div>
        <div className='sElection__input-ctr'>
          <input
            type='radio'
            name='sElection'
            id='sElection__input-yes'
            value='Yes'
            checked={sElection === 'Yes'}
            onChange={handleChange}
           />
          <label htmlFor='sElection__input-yes'>
            Sí
          </label>
        </div>
        <div className='sElection__input-ctr'>
          <input
            type='radio'
            name='sElection'
            id='sElection__input-not-applicable'
            value='No Aplica'
            checked={sElection === 'No Aplica'}
            onChange={handleChange}
           />
          <label htmlFor='sElection__input-not-applicable'>
            No Aplica
          </label>
        </div>
      </fieldset>
    </div>
  )
}

export default SElection
