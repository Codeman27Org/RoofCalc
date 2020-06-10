import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import PrincipalAndInterest from './PrincipalAndInterest'
import Insurance from './Insurance'
import FloodInsurance from './FloodInsurance'
import PropertyTaxes from './PropertyTaxes'

const Results = (props) => {
  const [values, setValues] = useState({
      downPaymentPerc: props.results.monthly_mortgage.down_payment_perc * 100,
      housePrice: props.results.zestimates.zestimate
    })

  const downPaymentPercChange = (value) => {
    setValues({...values, downPaymentPerc: value})
  }

  const housePriceChange = (value) => {
    setValues({...values, housePrice: value})
  }

  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='accordion-area'>
        <PrincipalAndInterest
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
          downPaymentPercChange = {downPaymentPercChange}
          housePrice = {values.housePrice}
          housePriceChange = {housePriceChange}
        />
        <Insurance
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
        />
        <FloodInsurance
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
        />
        <PropertyTaxes
          values = {props.results}
          housePrice = {values.housePrice}
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
