import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, Accordion, Typography, AccordionDetails, AccordionSummary, FormControl} from '@material-ui/core'

const RehabCosts = (props) => {
  const [values, setValues] = useState({
      rehabCosts: 0,
      monthlyPayment: 0
    })

    const handleChange = (event) => {
      const re = /^[.,0-9\b]+$/;
      // if value is not blank, then test the regex and only accept numbers
      if (event.target.value === '' || re.test(event.target.value)) {
        setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
      }
    }

    useEffect(() => {
      setValues((values) => ({ ...values, monthlyPayment: formatter.format(values.rehabCosts.toString().replace(/,/g, ''))}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.rehabCosts])

    useEffect(() => {
      props.changeValue(parseInt(values.monthlyPayment.toString().replace(/[$,]/g, '')), 'rehabCosts')
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.monthlyPayment])

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
        <Typography>Estimated Rehab Costs</Typography>
        <Typography className='accordion-total expenses'>{values.monthlyPayment}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <TextField
              label='Estimated Rehab Costs'
              variant='filled'
              name='rehabCosts'
              value={values.rehabCosts}
              fullWidth={true}
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

export default RehabCosts
