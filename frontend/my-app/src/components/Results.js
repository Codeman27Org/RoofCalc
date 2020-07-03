import React, {useState, useEffect} from 'react'
import { Button } from '@material-ui/core'
import PrincipalAndInterest from './PrincipalAndInterest'
import Insurance from './Insurance'
import FloodInsurance from './FloodInsurance'
import PropertyTaxes from './PropertyTaxes'
import RentalIncome from './RentalIncome'
import Metrics from './Metrics'

const Results = (props) => {
  const [values, setValues] = useState({
      downPaymentPerc: 0,
      housePrice: 0,
      rentalIncome: 0,
      principalAndInterest: 0,
      insurance: 0,
      floodInsurance: 0,
      propertyTaxes: 0,
      rentRatio: 0
    })

  const downPaymentPercChange = (value) => {
    setValues((values) => ({...values, downPaymentPerc: value}))
  }

  const changeValue = (value, name) => {
    setValues((values) => ({...values, [name]: value}))
  }

  useEffect(() => {
    setValues((values) => ({...values, rentRatio: (values.rentalIncome/values.housePrice)}))
  }, [values.rentalIncome, values.housePrice])

  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <Metrics />
      <div className='accordion-area'>
        <RentalIncome
          values = {props.results}
          rentalIncome ={values.rentalIncome}
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
