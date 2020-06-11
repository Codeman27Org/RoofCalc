import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl} from '@material-ui/core'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = useState({
      rentZestimate: props.values.zestimates.rent_zestimate.toLocaleString('en-US'),
      monthlyPayment: props.values.zestimates.rent_zestimate.toLocaleString('en-US')
    })


    const handleChange = (event) => {
      const re = /^[.,0-9\b]+$/;
      // if value is not blank, then test the regex and only accept numbers
      if (event.target.value === '' || re.test(event.target.value)) {
        setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
      }
    }

  useEffect(() => {
    props.housePriceChange(values.zestimate)
    monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zestimate, values.downPayment, values.downPaymentPerc, values.loanType, values.rate]);

  useEffect(() => {
    if (values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('amount', values.downPayment, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPayment]);

  useEffect(() => {
    props.downPaymentPercChange(values.downPaymentPerc)
    if (!values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('percent', values.downPaymentPerc, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPaymentPerc]);

  useEffect(() => {
   monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon className='expand-icon'/>}
      aria-controls='panel1a-content'
      id='panel1a-header'
      className='accordion-summary'
      >
        <Typography>Principal & Interest</Typography>
        <Typography className='accordion-total'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
        <TextField
            label='Home Price'
            variant='filled'
            name='zestimate'
            value={values.zestimate}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <p style={{marginBottom: '0px'}}>$</p>
                  </InputAdornment>
                ),
              }}
            onChange={(event, value)=> handleChange(event, value)}
          />
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default PrincipalAndInterest
