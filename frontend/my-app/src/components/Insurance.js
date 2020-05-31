import React, {useState, useEffect} from 'react'
import FormControl from '@material-ui/core/FormControl'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

const Insurance = (props) => {
  const [values, setValues] = useState({
      pmi: props.values.pmi.yearly.toLocaleString('en-US'),
    })

    const handleChange = (event, value) => {
      const re = /^[.,0-9\b]+$/;
      // if value is not blank, then test the regex and only accept numbers
      if (event.target.value === '' || re.test(event.target.value)) {
        if (event.target.name === 'zestimate' || event.target.name === 'downPayment') {
          setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
        } else {
          setValues({ ...values, [event.target.name]: event.target.value})
        }
      }
    }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  return (
    <ExpansionPanel>
    {console.log(props)}
      <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon className='expand-icon'/>}
      aria-controls='panel1a-content'
      id='panel1a-header'
      className='accordion-summary'
      >
        <Typography>Insurance</Typography>
        <Typography className='accordion-total'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
        <TextField
            label='Mortgage Insurance'
            variant='filled'
            name='zestimate'
            value={values.pmi}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <p style={{marginBottom: '0px'}}>$</p>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                  <Tooltip
                    title="Mortgage Insurnace is usually required under 20% down payment"
                    enterTouchDelay={100}
                    >
                    <InfoIcon />
                  </Tooltip>
                  </InputAdornment>
                ),
              }}
            onChange={(event, value)=> handleChange(event, value)}
          />
          <TextField
              label='Mortgage Insurance'
              variant='filled'
              name='zestimate'
              value={values.pmi}
              onChange={(event, value)=> handleChange(event, value)}
            />
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Insurance
