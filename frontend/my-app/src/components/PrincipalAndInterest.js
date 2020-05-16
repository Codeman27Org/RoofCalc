import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import TextField from '@material-ui/core/TextField'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = React.useState({
      zestimate: props.values.zestimates.zestimate,
      downPayment: props.values.monthly_mortgage.down_payment,
      downPaymentPerc: props.values.monthly_mortgage.down_payment_perc,
      loanType: props.values.mortgage_rate.loan_type,
      rate: props.values.mortgage_rate.rate,
    })

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value})
  // }
  const handleChange = (event, value) => {
    setValues({ ...values, [event.target.name]: event.target.value})
  }


  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon className='expand-icon'/>}
      aria-controls='panel1a-content'
      id='panel1a-header'
      className='accordion-summary'
      >
        <Typography>Principal & Interest</Typography>
        <Typography className='accordion-total'>$1,300/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
          <CurrencyTextField
              label='Home price'
              variant='filled'
              name='zestimate'
              value={values.zestimate}
              currencySymbol='$'
              decimalPlaces = {0}
              outputFormat='string'
              textAlign='left'
              onChange={(event, value)=> handleChange(event, value)}
          />
          <div className='two-column'>
            <CurrencyTextField
                label='Down Payment'
                variant='filled'
                name='downPayment'
                value={values.downPayment}
                currencySymbol='$'
                decimalPlaces = {0}
                outputFormat='string'
                textAlign='left'
                onChange={(event, value)=> handleChange(event, value)}
            />
            <CurrencyTextField
                label=' '
                variant='filled'
                name='downPaymentPerc'
                value={values.downPaymentPerc}
                currencySymbol='%'
                decimalPlaces = {0}
                outputFormat='string'
                textAlign='left'
                onChange={(event, value)=> handleChange(event, value)}
            />
          </div>
          <div className='two-column'>
            <TextField
                label='Loan Program'
                variant='filled'
                name='loanType'
                value={values.loanType}
                onChange={(event, value)=> handleChange(event, value)}
            />
            <CurrencyTextField
                label='Interest Rate'
                variant='filled'
                name='rate'
                value={values.rate}
                currencySymbol='%'
                decimalPlaces = {3}
                outputFormat='string'
                textAlign='left'
                onChange={(event, value)=> handleChange(event, value)}
            />
          </div>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default PrincipalAndInterest
