import React from 'react'
import { Button } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

const Results = (props) => {
  const [values, setValues] = React.useState({
      amount: props.results.zestimates.zestimate.toLocaleString()
    })

  const handleChange = (prop) => (event) => {
    setValues({ ...values.toLocaleString(), [prop]: event.target.value});
  }

  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='accordion-area'>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className='expand-icon'/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className='accordion-summary'
          >
            <Typography>Principal & Interest</Typography>
            <Typography className='accordion-total'>$1,300/Mo</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl fullWidth>
              <InputLabel htmlFor="standard-adornment-amount">Home price</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className='button-box'>
        <Button variant='outlined' color='primary' onClick={() => props.switch()}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default Results
