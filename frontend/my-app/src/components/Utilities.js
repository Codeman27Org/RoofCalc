import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl} from '@material-ui/core'

const Utilities = (props) => {
  const [values, setValues] = useState({
      waterCost: 0,
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
      props.changeValue(parseInt(values.monthlyPayment.toString().replace(/[$,]/g, '')), 'rehabCosts')
    }, [values.monthlyPayment])

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
        <Typography>Utilities</Typography>
        <Typography className='accordion-total expenses'>{values.monthlyPayment}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
          <TextField
              label='Water'
              variant='filled'
              name='rehabCosts'
              value={values.waterCost}
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
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Utilities
