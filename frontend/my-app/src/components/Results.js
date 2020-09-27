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
import Demographics from './Demographics'
import logo from '../RoofCalc.png'

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
      capRate: 0,
      loanCosts: 0,
      rehabCosts: 0,
      cashOnCashReturn: 0,
      netIncome: 0,
      utilities: 0,
    })

  const downPaymentPercChange = (value) => {
    setValues((values) => ({...values, downPaymentPerc: value}))
  }

  const changeValue = (value, name) => {
    setValues((values) => ({...values, [name]: value}))
  }

  useEffect(() => {
    setValues((values) => ({...values, cashOnCashReturn:
      ((values.netIncome * 12)/(values.downPayment + values.loanCosts + values.rehabCosts) * 100).toFixed(2) }))
  }, [values.downPayment, values.loanCosts, values.rehabCosts, values.netIncome])

  useEffect(() => {
    setValues((values) => ({...values, capRate: (100 * ((values.netRentalIncome * 12) - values.insurance - values.floodInsurance - values.propertyTaxes - values.utilities)/values.housePrice).toFixed(2)}))
  }, [values.netRentalIncome, values.housePrice, values.insurance, values.floodInsurance, values.propertyTaxes, values.utilities])

  useEffect(() => {
    setValues((values) => ({...values, netIncome: values.netRentalIncome - values.principalAndInterest - values.insurance - values.floodInsurance - values.propertyTaxes - values.utilities}))
  }, [values.netRentalIncome, values.principalAndInterest, values.insurance, values.floodInsurance, values.propertyTaxes, values.utilities])

  return (
    <div className='results'>
      <img src={logo} alt='logo' className='logo'/>
      <p className='app-description'>{props.inputAddress}</p>
      <Metrics
          values = {values}
      />
      <Demographics
          dataUsa = {props.results.data_usa}
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
          housePrice = {values.housePrice}
        />
        <FloodInsurance
          values = {props.results}
          downPaymentPerc = {values.downPaymentPerc}
          changeValue = {changeValue}
          housePrice = {values.housePrice}
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
