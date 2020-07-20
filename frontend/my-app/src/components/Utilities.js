import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl} from '@material-ui/core'

const Utilities = (props) => {
  const [values, setValues] = useState({
      waterCost: 0,
      energyCost: 0,
      hoaCost: 0,
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
      let waterCostInt = parseInt(values.waterCost.toString().replace(',', ''))
      let energyCostInt = parseInt(values.energyCost.toString().replace(',', ''))
      let hoaCostInt = parseInt(values.hoaCost.toString().replace(',', ''))

      setValues((values) => ({...values, monthlyPayment: formatter.format(waterCostInt + energyCostInt + hoaCostInt)}))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.waterCost, values.energyCost, values.hoaCost])

    useEffect(() => {
      props.changeValue(parseInt(values.monthlyPayment.toString().replace(/[$,]/g, '')), 'utilities')
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Typography className='accordion-total expenses'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
          <TextField
              label='Water\Sewer'
              variant='filled'
              name='waterCost'
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
          <TextField
              label='Gas\Electric'
              variant='filled'
              name='energyCost'
              value={values.energyCost}
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
          <TextField
              label="Homeowner's Assocation"
              variant='filled'
              name='hoaCost'
              value={values.hoaCost}
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
