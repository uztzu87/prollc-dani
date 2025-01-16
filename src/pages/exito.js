import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from "react-helmet"

import Layout from '../components/layout'

import '../styles/success.scss'

const Success = (props) => {

  return (
    <Layout pageTitle='¡Éxito!'>
      <Helmet>
        <meta name='robots' content='noindex' />
      </Helmet>
      <div className='success'>
        <div className='success__ctr'>
          <h1>¡Gracias por tu pedido!</h1>
          <p>Nos pondremos en contacto contigo pronto</p>
          <br />
          <div className='success__contact-ctr'>
            Si tienes alguna pregunta, por favor <Link to='/contacto'>contáctenos</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Success
