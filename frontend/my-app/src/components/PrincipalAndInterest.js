import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, Accordion, Typography, AccordionDetails, AccordionSummary, FormControl} from '@material-ui/core'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = useState({
      zestimate: props.values.zestimates.zestimate.toLocaleString('en-US'),
      downPayment: props.values.monthly_mortgage.down_payment.toLocaleString('en-US'),
      downPaymentPerc: props.values.monthly_mortgage.down_payment_perc * 100,
      loanType: '30-year',//props.values.mortgage_rate.loan_type,
      rate: (props.values.mortgage_rate.rate * 100).toString().slice(0,5),
      monthlyPayment: '',
      percActive: true,
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
        setValues((values) => ({...values, downPayment: formatter.format(Math.round((value/100) * housePrice.replace(/,/g, ''))).replace('$', '')}))
      }
      else {
        setValues((values) => ({...values, downPaymentPerc: (value.replace(/,/g, '')/housePrice.replace(/,/g, '') * 100).toFixed(1)}))
      }
    }

    const handleChange = (event) => {
      const re = /^[.,0-9\b]+$/;
      // if value is not blank, then test the regex and only accept numbers
      if (event.target.value === '' || re.test(event.target.value)) {
        if (event.target.name === 'zestimate' || event.target.name === 'downPayment' || event.target.name === 'closingCosts') {
          setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
        }
        else if (event.target.value.match(/^\d*(\.\d*)?$/g)) {
          setValues({ ...values, [event.target.name]: event.target.value === '' ? 0 : event.target.value.replace(/(^0)(\d)/g, '$2')})
        }
      }
    }

  useEffect(() => {
    props.changeValue(parseInt(values.zestimate.replace(/,/g, '')), 'housePrice')
    monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zestimate, values.downPayment, values.downPaymentPerc, values.loanType, values.rate])

  useEffect(() => {
    props.changeValue(parseInt(values.downPayment.toString().replace(/[$,]/g, '')), 'downPayment')
    if (values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('amount', values.downPayment, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPayment])

  useEffect(() => {
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
    setValues((values) => ({...values, closingCosts: formatter.format(((values.zestimate).replace(/[$,]/g, '') * 0.035).toFixed(0)).replace(/[$]/g, '')}))
    downPaymentCalc('percent', values.downPaymentPerc, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zestimate])

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
    <Accordion>
      <AccordionSummary
      expandIcon={<ExpandMoreIcon className='expand-icon'/>}
      aria-controls='panel1a-content'
      id='panel1a-header'
      className='accordion-summary'
      >
        <Typography>Principal & Interest</Typography>
        <Typography className='accordion-total expenses'>{values.monthlyPayment}/Mo</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
            onChange={(event)=> handleChange(event)}
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
                onChange={(event)=> handleChange(event)}
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
                onChange={(event)=> handleChange(event)}
            />
          </div>
          <div className='two-column'>
            <TextField
                label='Loan Program'
                variant='filled'
                name='loanType'
                value={values.loanType}
                fullWidth={true}
                onChange={(event)=> handleChange(event)}
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
                onChange={(event)=> handleChange(event)}
            />
          </div>
          <TextField
              label='Est. Loan Costs'
              variant='filled'
              name='closingCosts'
              fullWidth={true}
              value={values.closingCosts}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <p>$</p>
                    </InputAdornment>
                  ),
                }}
              onChange={(event)=> handleChange(event)}
            />
        </FormControl>
      </AccordionDetails>
    </Accordion>
  )
}

export default PrincipalAndInterest
