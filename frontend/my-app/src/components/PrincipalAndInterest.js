import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = React.useState({
      amount: props.values.zestimate
    })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value});
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon className='expand-icon'/>}
      aria-controls='panel1a-content'
      id='panel1a-header'
      className='accordion-summary'
      >
        <Typography>Principal & Interest</Typography>
        <Typography className='accordion-total'>$1,300/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
          <CurrencyTextField
              label='Home price'
              variant='standard'
              value={props.values.zestimate}
              currencySymbol='$'
              decimalPlaces = {0}
              outputFormat='string'
              textAlign='left'
              onChange={(event, value)=> handleChange(value)}
          />
          <div className='two-column'>
            <CurrencyTextField
                label='Down Payment'
                variant='standard'
                value={props.values.zestimate}
                currencySymbol='$'
                decimalPlaces = {0}
                outputFormat='string'
                textAlign='left'
                onChange={(event, value)=> handleChange(value)}
            />
            <CurrencyTextField
                label=' '
                variant='standard'
                value={props.values.zestimate}
                currencySymbol='$'
                decimalPlaces = {0}
                outputFormat='string'
                textAlign='left'
                onChange={(event, value)=> handleChange(value)}
            />
          </div>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default PrincipalAndInterest
