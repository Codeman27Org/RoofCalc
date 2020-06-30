import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InfoIcon from '@material-ui/icons/Info'
import { Checkbox,Tooltip, InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl } from '@material-ui/core'

const FloodInsurance = (props) => {
  const [values, setValues] = useState({
      fiChecked: false,
      fi: props.values.fi.yearly.toLocaleString('en-US'),
      monthlyPayment: 0,
    })

  useEffect(() => {
    let fi = values.fiChecked ? parseInt(values.fi.replace(/,/g, '')) : 0

    setValues({ ...values, monthlyPayment: formatter.format((fi/12).toFixed(0))});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.fi, values.fiChecked])

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
    <ExpansionPanel>
      <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon className='expand-icon'/>}
      aria-controls='panel1a-content'
      id='panel1a-header'
      className='accordion-summary'
      >
        <Typography>Flood Insurance</Typography>
        <Typography className='accordion-total expenses'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
          <div className='two-column'>
            <Checkbox
              color='primary'
              onChange={(event) => {setValues({ ...values, fiChecked: !values.fiChecked})}}
            />
            <TextField
                label='Flood Insurance'
                name='fi'
                variant='filled'
                disabled={!values.fiChecked}
                value={values.fiChecked ? values.fi : 0}
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
                        title="Flood insurance is required if the house is located in a frequent flood plain"
                        enterTouchDelay={0}
                        >
                        <InfoIcon />
                      </Tooltip>
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

export default FloodInsurance
