/* eslint-disable jsx-a11y/media-has-caption */

import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import CheckIcon from '../images/svgs/check-icon.svg'

import '../styles/index.scss'

const Home = (props) => {

  return (
    <Layout>
      <SEO title='Home' />
      <div className='index'>
        <div className='index__intro-ctr'>
          <div className='index__intro-inner-ctr'>
            <div className='index__intro-text'>
              <h1>Tu primer paso hacia el sueño americano</h1>
              <div className='index__features-ctr'>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Tarifas estatales de presentación incluidas
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Escritura de constitución
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Servicios de agente registrado
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Soporte - Telefónico y correo electrónico
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Obtención del número de identificación tributaria
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Elección de la clasificación tributaria de S-Corp, si aplica
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Certificados de membresía
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Apertura de cuenta bancaria (exclusiones aplican)
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Acuerdo operativo
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon />
                  </span> Consulta con abogado
                </div>
                <div className='index__features-feature'>
                  <span className='index__check-icon'>
                    <CheckIcon /></span> Resolución bancaria
                </div>
              </div>
              <p>A partir de $300</p>
              <Link className='index__intro-form-link' to='/crear-empresa'>Crear Tu Empresa</Link>
              
            </div>
            <div className='index__intro-image'>
              <StaticImage src='../images/flags-buildings.jpg' alt='buildings with US flag' />
            </div>
          </div>
        </div>
        <div className='index__why-prollc-ctr'>
          <div className='index__why-prollc-inner-ctr'>
            <h2>¿Por qué crear tu empresa con ProLLC?</h2>
            <ol>
              <li>Porque somos la primera web fundada y gestionada por abogados que se centra en ayudar al emprendedor hispanohablante a constituir su LLC en Estados Unidos.</li>
              <li>Porque con nuestra ayuda podrás constituir tu empresa desde la comodidad de tu casa, sin tener que desplazarte a los EE.UU.</li>
              <li>Porque te guiaremos en relación con todos los trámites que debes cumplimentar a la hora de la constituir tu compañía LLC, incluyendo la obtención del número de identificación tributaria y la apertura de cuenta bancaria; y te ayudaremos a que los completes a tiempo y con la completa seguridad de que todo se realizó conforme a las normas mercantiles vigentes.</li>
              <li>Porque te ofrecemos un servicio especializado; estarás hablando con una persona competente en este campo y no con un vendedor.</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
