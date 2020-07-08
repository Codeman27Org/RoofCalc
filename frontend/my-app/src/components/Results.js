import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core'
import PrincipalAndInterest from './PrincipalAndInterest'
import Insurance from './Insurance'
import FloodInsurance from './FloodInsurance'
import PropertyTaxes from './PropertyTaxes'
import RentalIncome from './RentalIncome'
import Metrics from './Metrics'
import RehabCosts from './RehabCosts'
import Utilities from './Utilities'

const Results = (props) => {
  const [values, setValues] = useState({
      downPaymentPerc: 0,
      downPayment: 0,
      housePrice: 0,
      netRentalIncome: 0,
      grossRentalIncome: 0,
      principalAndInterest: 0,
      insurance: 0,
      floodInsurance: 0,
      propertyTaxes: 0,
      rentRatio: 0,
      loanCosts: 0,
      rehabCosts: 0,
      cashOnCashReturn: 0,
      netIncome: 0
    })

  const downPaymentPercChange = (value) => {
    setValues((values) => ({...values, downPaymentPerc: value}))
  }

  const changeValue = (value, name) => {
    setValues((values) => ({...values, [name]: value}))
  }

  useEffect(() => {
    setValues((values) => ({...values, cashOnCashReturn: (((values.netRentalIncome - values.principalAndInterest) * 12)/ (values.downPayment + values.loanCosts + values.rehabCosts) * 100).toFixed(2) }))
  }, [values.netRentalIncome, values.principalAndInterest, values.downPayment, values.loanCosts, values.rehabCosts])

  useEffect(() => {
    setValues((values) => ({...values, rentRatio: (100.0 * values.grossRentalIncome/values.housePrice).toFixed(2)}))
  }, [values.netRentalIncome, values.housePrice])

  useEffect(() => {
    setValues((values) => ({...values, netIncome: values.netRentalIncome - values.principalAndInterest - values.insurance - values.floodInsurance - values.propertyTaxes}))
  }, [values.netRentalIncome, values.principalAndInterest, values.insurance, values.floodInsurance, values.propertyTaxes])

  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <Metrics
          values = {values}
      />
      <div className='accordion-area'>
        <RentalIncome
          values = {props.results}
          changeValue = {changeValue}
        />
        <PrincipalAndInterest
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
          downPaymentPercChange = {downPaymentPercChange}
          housePrice = {values.housePrice}
          changeValue = {changeValue}
        />
        <Insurance
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
          changeValue = {changeValue}
        />
        <FloodInsurance
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
          changeValue = {changeValue}
        />
        <PropertyTaxes
          values = {props.results}
          housePrice = {values.housePrice}
          changeValue = {changeValue}
        />
        <Utilities
          changeValue={changeValue}
        />
        <RehabCosts
          changeValue={changeValue}
        />
      </div>
      <div className='button-box'>
        <Button variant='outlined' color='primary' onClick={() => props.switch()}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default Results
