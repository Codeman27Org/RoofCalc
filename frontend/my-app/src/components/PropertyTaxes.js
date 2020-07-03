import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl} from '@material-ui/core'

const PropertyTaxes = (props) => {
  const [values, setValues] = useState({
      taxAmount: props.values.taxes.tax_amt_yr.toLocaleString('en-US'),
      taxRate: (props.values.taxes.tax_rate * 100).toString().slice(0,4),
      monthlyPayment: '',
      percActive: false
    })

    const taxAmountCalc = (type, value, housePrice) => {
      if (type === 'percent') {
        setValues({...values, taxAmount: formatter.format(Math.round((value/100) * parseInt(housePrice.toString().replace(/,/g, '')))).replace('$', '')}) //divide by 100 to get it as a percent again
      }
      else {
        setValues({...values, taxRate: ((parseInt(value.toString().replace(/,/g, ''))/parseInt(housePrice.toString().replace(/,/g, ''))) * 100).toFixed(2)})
      }
    }

    const handleChange = (event) => {
      const re = /^[.,0-9\b]+$/;
      // if value is not blank, then test the regex and only accept numbers
      if (event.target.value === '' || re.test(event.target.value)) {
        if (event.target.name === 'taxAmount') {
          setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
        } else {
          setValues({ ...values, [event.target.name]: (event.target.value === '' || event.target.value === '.') ? 0.0 : event.target.value.replace(/\b(?:0*(0\.\d+)|0+)/g, '$1')})
        }
      }
    }

  useEffect(() => {
    props.changeValue(parseInt(values.monthlyPayment.replace('$', '')))
  }, [values.monthlyPayment])

  useEffect(() => {
    setValues({ ...values, monthlyPayment: formatter.format(Math.round(values.taxAmount.replace(/,/g, '')/12))})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.taxAmount, values.taxRate])

  useEffect(() => {
    if (values.percActive) return //Don't want current textfield changing while the user is changing it
    taxAmountCalc('amount', values.taxAmount, props.housePrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.taxAmount]);

  useEffect(() => {
    if (!values.percActive) return //Don't want current textfield changing while the user is changing it
    taxAmountCalc('percent', values.taxRate, props.housePrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.taxRate]);

  useEffect(() => {
    setValues({ ...values, monthlyPayment: formatter.format(Math.round(values.taxAmount.replace(/,/g, '')/12))})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <Typography>Property Taxes</Typography>
        <Typography className='accordion-total expenses'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
          <div className='two-column'>
            <TextField
                label='Tax Amount'
                variant='filled'
                name='taxAmount'
                value={values.taxAmount}
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
                label='Tax Rate'
                variant='filled'
                name='taxRate'
                value={values.taxRate}
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
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default PropertyTaxes
