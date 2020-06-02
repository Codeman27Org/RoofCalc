import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import PrincipalAndInterest from './PrincipalAndInterest'
import Insurance from './Insurance'

const Results = (props) => {
  const [values, setValues] = useState({
      downPaymentPerc: props.results.monthly_mortgage.down_payment_perc * 100,
    })

  const downPaymentPercChange = (value) => {
    setValues({...values, downPaymentPerc: value})
  }

  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='accordion-area'>
        <PrincipalAndInterest
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
          downPaymentPercChange = {downPaymentPercChange}
        />
        <Insurance
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
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
