import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Icon, InlineIcon } from '@iconify/react'
import percentIcon from '@iconify/icons-mdi/percent'
import AccountCircle from '@material-ui/icons/AccountCircle'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = React.useState({
      zestimate: props.values.zestimates.zestimate,
      downPayment: props.values.monthly_mortgage.down_payment,
      downPaymentPerc: props.values.monthly_mortgage.down_payment_perc * 100,
      loanType: props.values.mortgage_rate.loan_type,
      rate: (props.values.mortgage_rate.rate * 100).toString().slice(0,5),
    })

  const handleChange = (event, value) => {
    setValues({ ...values, [event.target.name]: event.target.value})
  }


  return (
    <ExpansionPanel>
      {console.log(values)}
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
                minimumValue = '0'
                textAlign='left'
                onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label=' '
                variant='filled'
                name='downPaymentPerc'
                value={values.downPaymentPerc}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">%</p>
                      </InputAdornment>
                    ),
                  }}
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
            <TextField
                label='Interest Rate'
                variant='filled'
                name='rate'
                value={values.rate}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">%</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
          </div>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default PrincipalAndInterest
