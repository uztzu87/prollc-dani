import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'

import * as validation from '../helpers/validation.js'
import calcPrice from '../helpers/calcPrice.js'
import initialPlanValues from '../helpers/initialPlanValues.js'
import usePrices from '../hooks/usePrices.js'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Loading from '../components/ui/loading.js'
import FileState from '../components/plans/fileState'
import CompanyNames from '../components/plans/companyNames'
import Denomination from '../components/plans/denomination'
import Industry from '../components/plans/industry'
import EmployeeCount from '../components/plans/employeeCount'
import ProAddress from '../components/plans/proAddress'
import Members from '../components/plans/members'
import Managers from '../components/plans/managers'
import ProRegisteredAgent from '../components/plans/proRegisteredAgent'
import BankAccount from '../components/plans/bankAccount.js'
import Addons from '../components/plans/addons.js'
import Checkout from '../components/plans/checkout'

import '../styles/plans/allPlans.scss'

const CreateCompany = (props) => {
  const [currentStep, setCurrentStep] = useState({component: FileState})
  const [previousSteps, setPreviousSteps] = useState([])
  const [validationErrors, setValidationErrors] = useState([])
  const [progress, setProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleNextClick = async (e) => {
    const setPrevious = () => {
      setPreviousSteps([...previousSteps, currentStep.component])
    }

    const incProgress = () => {
      setProgress(progress + 1)
    }

    switch (currentStep.component) {
      case FileState: {
        setPrevious()
        setCurrentStep({component: CompanyNames})
        incProgress()

        break
      }
      case CompanyNames: {
        validation.companyNames
        .validate(formik.values.companyNames, {abortEarly: false})
        .then(valid => {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: Denomination})
          incProgress()
        })
        .catch(err => {
          setValidationErrors(err.errors)
        })

        break
      }
      case Denomination: {
        setPrevious()
        setCurrentStep({component: Industry})
        incProgress()

        break
      }
      case Industry: {
        validation.industry
        .validate(formik.values.industry, {abortEarly: false})
        .then(valid => {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: EmployeeCount})
          incProgress()
        })
        .catch(err => {
          setValidationErrors(err.errors)
        })

        break
      }
      case EmployeeCount: {
        validation.employeeCount
        .validate(formik.values.employeeCount, {abortEarly: false})
        .then(valid => {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: ProAddress})
          incProgress()
        })
        .catch(err => {
          setValidationErrors(err.errors)
        })

        break
      }
      case ProAddress: {
        if (formik.values.companyAddress.proAddress === 'No') {
          validation.companyAddress
          .validate(formik.values.companyAddress, {abortEarly: false})
          .then(valid => {
            setPrevious()
            setValidationErrors([])
            setCurrentStep({component: Members})
            incProgress()
          })
          .catch(err => {
            setValidationErrors(err.errors)
          })
        } else {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: Members})
          incProgress()
        }

        break
      }
      case Members: {
        const memberCount = +formik.values.members.memberCount
        let memberErrors = []

        if (Number.isInteger(memberCount)) {
          for (let i = 0; i < memberCount; i++) {
            await validation.memberAndManagerDetails(i)
            .validate(formik.values.members.memberDetails[i], {abortEarly: false})
            .catch(err => {
                memberErrors.push(...err.errors)
            })
          }
        }

        if (memberErrors.length) {
          setValidationErrors(memberErrors)
        } else {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: Managers})
          incProgress()
        }

        break
      }
      case Managers: {
        const managerCount = +formik.values.managers.managerCount
        let managerErrors = []

        if (Number.isInteger(managerCount)) {
          for (let i = 0; i < managerCount; i++) {
            await validation.memberAndManagerDetails(i)
            .validate(formik.values.managers.managerDetails[i], {abortEarly: false})
            .catch(err => {
              managerErrors.push(...err.errors)
            })
          }
        }

        if (managerErrors.length) {
          setValidationErrors(managerErrors)
        } else {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: ProRegisteredAgent})
          incProgress()
        }

        break
      }
      case ProRegisteredAgent: {
        if (formik.values.registeredAgent.proRegisteredAgent === 'No') {
          validation.proRegisteredAgent
          .validate(formik.values.registeredAgent, {abortEarly: false})
          .then(valid => {
            setPrevious()
            setValidationErrors([])
            setCurrentStep({component: BankAccount})
            incProgress()
          })
          .catch(err => {
            setValidationErrors(err.errors)
          })
        } else {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: BankAccount})
          incProgress()
        }

        break
      }
      case BankAccount: {
        if (formik.values.addons.bankAccount) {
          validation.ein
          .validate(formik.values.ein, {abortEarly: false})
          .then(valid => {
            setPrevious()
            setValidationErrors([])
            setCurrentStep({component: Addons})
            incProgress()
          })
          .catch(err => {
            setValidationErrors(err.errors)
          })
        } else {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: Addons})
          incProgress()
        }

        break
      }
      case Addons: {
        if (formik.values.addons.ein) {
          validation.ein
          .validate(formik.values.ein, {abortEarly: false})
          .then(valid => {
            setPrevious()
            setValidationErrors([])
            setCurrentStep({component: Checkout})
            incProgress()
          })
          .catch(err => {
            setValidationErrors(err.errors)
          })
        } else {
          setPrevious()
          setValidationErrors([])
          setCurrentStep({component: Checkout})
          incProgress()
        }

        break
      }
      default:
        setPreviousSteps([])
        setCurrentStep({component: FileState})
        setValidationErrors([])
        setProgress(0)
    }
  }

  const handlePreviousClick = () => {
    setValidationErrors([])
    setCurrentStep({component: previousSteps.pop()})
    setProgress(progress - 1)
  }

  const formik = useFormik({
    initialValues: initialPlanValues('Pro'),
    onSubmit: async (e) => {
      setSubmitting(true)
      
      try {
        const res = await axios.post(
          '/api/create-checkout-session',
          {values: formik.values, prices: prices.prices}
        )
        window.location = res.data.url
      } catch (error) {
        console.error(error)
        setSubmitting(false)
      }
    },
    validationSchema: null,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false
  })

  const prices = usePrices()

  const CurrentStepComponent = currentStep.component

  const displayValidationErrors = validationErrors.map((error, i) => (
    <p key={i} className='allPlans__error'>{error}</p>
  ))

  const displayButtons = currentStep.component === Checkout
    ? <>
      <button
        type='button'
        disabled={submitting}
        onClick={handlePreviousClick}>
        Anterior
      </button>
      </>
    : previousSteps.length > 0
      ? <>
        <button
          type='button'
          disabled={submitting}
          onClick={handlePreviousClick}>
          Anterior
        </button>
        <button
          type='button'
          disabled={submitting}
          onClick={handleNextClick}>
          Siguiente
        </button>
        </>
      : <button
          type='button'
          disabled={submitting}
          onClick={handleNextClick}>
          Siguiente
        </button>

  return (
    <Layout pageTitle='Crear Tu Empresa'>
      <SEO title='Crear Tu Empresa' />
      <div className='allPlans'>
        {prices.loading 
          ? <Loading /> 
          : <>
            <div className='allPlans__top-ctr'>
              <div className='allPlans__progress-ctr'>
                {/* TODO: fix progress */}
                <p><span>Progreso:</span>{Math.round((progress / 11) * 100)} %</p>
              </div>
              <div className='allPlans__price-ctr'>
                <p>
                  <span>Precio:</span>
                  ${calcPrice(formik.values, prices.prices)}
                </p>
              </div>
            </div>
            <form className='allPlans__form' onSubmit={formik.handleSubmit}>
              <CurrentStepComponent
                formik={formik}
                submitting={submitting}
                setSubmitting={setSubmitting}
                prices={prices.prices}
              />
              <div className='allPlans__btn-ctr'>
                {validationErrors.length > 0 &&
                <div className='allPlans__errors-ctr'>{displayValidationErrors}</div>}
                {displayButtons}
              </div>
            </form>
            </>}
      </div>
    </Layout>
  )
}

export default CreateCompany
