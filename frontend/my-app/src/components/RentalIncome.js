import React, {useState, useEffect} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {InputAdornment, TextField, ExpansionPanel, Typography, ExpansionPanelDetails, ExpansionPanelSummary, FormControl} from '@material-ui/core'

const RentalIncome = (props) => {
  const [values, setValues] = useState({
      rentAmount: props.values.zestimates.rent_zestimate.toLocaleString('en-US'),
      monthlyPayment: props.values.zestimates.rent_zestimate.toLocaleString('en-US'),
      vacancyAmount: (props.values.zestimates.rent_zestimate * 0.1).toLocaleString('en-US'),
      vacancyRate: 10,
      repairsAmount: (props.values.zestimates.rent_zestimate * 0.1).toLocaleString('en-US'),
      repairsRate: 10,
      propertyManagementAmount: (props.values.zestimates.rent_zestimate * 0.1).toLocaleString('en-US'),
      propertyManagementRate: 10,
      percActive: false
    })

    const handleChange = (event) => {
      // const re = /^[.,0-9\b]+$/;
      // // if value is not blank, then test the regex and only accept numbers
      // if (event.target.value === '' || re.test(event.target.value)) {
        if (event.target.name.includes('Amount')) {
          setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).replace('$', '')})
        } else {
          setValues({ ...values, [event.target.name]: event.target.value === '' ? 0 : event.target.value.replace(/\b(?:0*(0\.\d+)|0+)/g, '$1')})
        }
      // }
    }

  useEffect(() => {
    if (values.percActive) return //Don't want current textfield changing while the user is changing it
    setValues({ ...values, vacancyRate: (values.vacancyAmount.toString().replace(/,/g, '')/values.rentAmount.toString().replace(/,/g, '')) * 100})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.vacancyAmount, values.rentAmount]);

  useEffect(() => {
    if (!values.percActive) return //Don't want current textfield changing while the user is changing it
    // downPaymentCalc('percent', values.downPaymentPerc, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.vacancyRate]);

  useEffect(() => {
    setValues({ ...values, monthlyPayment: formatter.format(values.rentAmount.toString().replace(/,/g, '')).replace('$', '')})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.rentAmount]);


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
        <Typography>Rental Income</Typography>
        <Typography className='accordion-total'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
        <TextField
            label='Rental Income'
            variant='filled'
            name='rentAmount'
            value={values.rentAmount}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <p style={{marginBottom: '0px'}}>$</p>
                  </InputAdornment>
                ),
              }}
            onChange={(event, value)=> handleChange(event, value)}
          />
          <div className='two-column'>
            <TextField
                label='Vacancy'
                className='amount-column'
                variant='filled'
                name='vacancyAmount'
                value={values.vacancyAmount}
                fullWidth={true}
                onFocus={() => setValues({...values, percActive: false})}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p style={{marginBottom: '0px'}}>$</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label=' '
                variant='filled'
                name='vacancyRate'
                value={values.vacancyRate}
                fullWidth={true}
                onFocus={() => setValues({...values, percActive: true})}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <p style={{marginBottom: '0px'}}>%</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
          </div>
          <div className='two-column'>
            <TextField
                label='Repairs'
                className='amount-column'
                variant='filled'
                name='repairsAmount'
                value={values.repairsAmount}
                fullWidth={true}
                onFocus={() => setValues({...values, percActive: false})}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p style={{marginBottom: '0px'}}>$</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
              <TextField
                  label=' '
                  variant='filled'
                  name='repairsRate'
                  value={values.repairsRate}
                  fullWidth={true}
                  InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <p style={{marginBottom: '0px'}}>%</p>
                        </InputAdornment>
                      ),
                    }}
                  onChange={(event, value)=> handleChange(event, value)}
            />
          </div>
          <div className='two-column'>
            <TextField
                label='Property Management'
                className='amount-column'
                variant='filled'
                name='propertyManagementAmount'
                value={values.propertyManagementAmount}
                fullWidth={true}
                onFocus={() => setValues({...values, percActive: false})}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <p style={{marginBottom: '0px'}}>$</p>
                      </InputAdornment>
                    ),
                  }}
                onChange={(event, value)=> handleChange(event, value)}
            />
              <TextField
                  label=' '
                  variant='filled'
                  name='propertyManagementRate'
                  value={values.propertyManagementRate}
                  fullWidth={true}
                  InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <p style={{marginBottom: '0px'}}>%</p>
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

export default RentalIncome
