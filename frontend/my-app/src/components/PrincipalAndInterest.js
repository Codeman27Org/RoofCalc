import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl} from '@material-ui/core'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = useState({
      zestimate: props.values.zestimates.zestimate.toLocaleString('en-US'),
      downPayment: props.values.monthly_mortgage.down_payment.toLocaleString('en-US'),
      downPaymentPerc: props.values.monthly_mortgage.down_payment_perc * 100,
      loanType: '30-year',//props.values.mortgage_rate.loan_type,
      rate: (props.values.mortgage_rate.rate * 100).toString().slice(0,5),
      monthlyPayment: '',
      percActive: false,
      closingCosts: props.values.closing_costs.closing_costs.toLocaleString('en-US'),
    })

    const monthlyPaymentCalc = (housePrice, downPayment, loanType, rate) => {
      let loan = housePrice.toString().replace(/,/g, '') - downPayment.toString().replace(/,/g, '')
      let numPayments = parseInt(loanType.substring(0, 2)) * 12 // 12 Months in year
      let monthlyRate = parseFloat((rate/100)/12) // 12 Months in year
      let monthlyPayment = Math.round(loan*(monthlyRate*Math.pow((1 + monthlyRate), numPayments))/(Math.pow((1 + monthlyRate), numPayments) - 1)) || 0

      setValues({...values, monthlyPayment: formatter.format(monthlyPayment)})
    }

    const downPaymentCalc = (type, value, housePrice) => {
      if (type === 'percent') {
        setValues({...values, downPayment: formatter.format(Math.round((value/100) * housePrice.replace(/,/g, ''))).replace('$', '')}) //divide by 100 to get it as a percent again
      }
      else {
        setValues({...values, downPaymentPerc: (value.replace(/,/g, '')/housePrice.replace(/,/g, '') * 100).toFixed(1)})
      }
    }

    const handleChange = (event) => {
      const re = /^[.,0-9\b]+$/;
      // if value is not blank, then test the regex and only accept numbers
      if (event.target.value === '' || re.test(event.target.value)) {
        if (event.target.name === 'zestimate' || event.target.name === 'downPayment') {
          setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
        } else {
          setValues({ ...values, [event.target.name]: event.target.value === '' ? 0 : event.target.value.replace(/\b(?:0*(0\.\d+)|0+)/g, '$1')})
        }
      }
    }

  useEffect(() => {
    props.changeValue(parseInt(values.zestimate.replace(',', '')), 'housePrice')
    monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zestimate, values.downPayment, values.downPaymentPerc, values.loanType, values.rate])

  useEffect(() => {
    if (values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('amount', values.downPayment, values.zestimate)
    props.changeValue(parseInt(values.downPayment.toString().replace(/[$,]/g, '')), 'downPayment')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPayment])

  useEffect(() => {
    console.log(parseInt(values.monthlyPayment.toString().replace(/[$,]/g, '')))
    console.log(values.monthlyPayment)
    props.changeValue(parseInt(values.monthlyPayment.replace(/[$,]/g, '')), 'principalAndInterest')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.monthlyPayment])

  useEffect(() => {
    props.downPaymentPercChange(values.downPaymentPerc)
    if (!values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('percent', values.downPaymentPerc, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPaymentPerc])

  useEffect(() => {
    props.changeValue(parseInt(values.closingCosts.toString().replace(/[$,]/g, '')), 'loanCosts')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.closingCosts])

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
        <Typography className='accordion-total expenses'>{values.monthlyPayment}/Mo</Typography>
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
                    <p>$</p>
                  </InputAdornment>
                ),
              }}
            onChange={(event, value)=> handleChange(event, value)}
          />
          <div className='two-column'>
            <TextField
                label='Down Payment'
                variant='filled'
                name='downPayment'
                value={values.downPayment}
                fullWidth={true}
                onFocus={() => setValues({...values, percActive: false})}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p>$</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label=' '
                variant='filled'
                name='downPaymentPerc'
                value={values.downPaymentPerc}
                fullWidth={true}
                onFocus={() => setValues({...values, percActive: true})}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <p>%</p>
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
                fullWidth={true}
                onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label='Interest Rate'
                variant='filled'
                name='rate'
                value={values.rate}
                fullWidth={true}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <p>%</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
          </div>
          <TextField
              label='Est. Loan Costs'
              variant='filled'
              name='closingCosts'
              onFocus={() => setValues({...values, percActive: false})}
              fullWidth={true}
              value={values.closingCosts}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <p>$</p>
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
