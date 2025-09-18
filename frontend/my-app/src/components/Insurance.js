import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InfoIcon from '@material-ui/icons/Info'
import {Tooltip, InputAdornment, TextField, Accordion, Typography, AccordionDetails, AccordionSummary, FormControl } from '@material-ui/core'

const Insurance = (props) => {
  const [values, setValues] = useState({
      pmiChecked: false,
      pmi: props.values.pmi.yearly.toLocaleString('en-US'),
      fiChecked: false,
      pi: props.values.pi.yearly.toLocaleString('en-US'),
      monthlyPayment: 0,
      insuranceRate: 0.005365,
      pmiInsuranceRate: 0.01
    })

  useEffect(() => {
    setValues({ ...values, pmiChecked: (parseInt(props.downPaymentPerc) < 20 ? true : false)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    props.changeValue(parseInt(values.monthlyPayment.toString().replace(/[$,]/g, '')), 'insurance')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.monthlyPayment])

  useEffect(() => {
    let pmi = values.pmiChecked ? parseInt(values.pmi.replace(/,/g, '')) : 0
    let pi = parseInt(values.pi.toString().replace(/,/g, ''))

    setValues({ ...values, monthlyPayment: formatter.format(((pmi + pi)/12).toFixed(0))});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.pmi, values.pmiChecked, values.pi])

  useEffect(() => {
    setValues((values) => ({...values, pi: formatter.format((props.housePrice * values.insuranceRate).toFixed(0)).replace('$', '')}))
    setValues((values) => ({...values, pmi: formatter.format((props.housePrice * values.pmiInsuranceRate).toFixed(0)).replace('$', '')}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.housePrice])

  const handleChange = (event, value) => {
    const re = /^[.,0-9\b]+$/
    // if value is not blank, then test the regex and only accept numbers
    if (event.target.value === '' || re.test(event.target.value)) {
      setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
    }
  }

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
        <Typography>Insurance</Typography>
        <Typography className='accordion-total expenses'>{values.monthlyPayment}/Mo</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <TextField
              label='Property Insurance'
              name='pi'
              variant='filled'
              value={values.pi}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <p>$</p>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                    <p style={{marginBottom: '0px', marginRight: '15px'}}>/Year</p>
                    </InputAdornment>
                  ),
                }}
              onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label='Mortgage Insurance'
                name='pmi'
                variant='filled'
                disabled={!values.pmiChecked}
                value={values.pmiChecked ? values.pmi : 0}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p>$</p>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                      <p style={{marginBottom: '0px', marginRight: '15px'}}>/Year</p>
                      <Tooltip
                        title="Mortgage insurance is usually required under 20% down payment"
                        enterTouchDelay={100}
                        >
                        <InfoIcon
                          className='info-icon'
                        />
                      </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
              />
        </FormControl>
      </AccordionDetails>
    </Accordion>
  )
}

export default Insurance
