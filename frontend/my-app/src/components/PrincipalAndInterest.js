import React, {useState, useEffect} from 'react'
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = useState({
      zestimate: props.values.zestimates.zestimate.toLocaleString('en-US'),
      downPayment: props.values.monthly_mortgage.down_payment.toLocaleString('en-US'),
      downPaymentPerc: props.values.monthly_mortgage.down_payment_perc * 100,
      loanType: '30-year',//props.values.mortgage_rate.loan_type,
      rate: (props.values.mortgage_rate.rate * 100).toString().slice(0,5),
      monthlyPayment: '',
      percActive: false
    })


    const monthlyPaymentCalc = (housePrice, downPayment, loanType, rate) => {
      let loan = housePrice.toString().replace(/,/g, '') - downPayment.toString().replace(/,/g, '')
      let numPayments = parseInt(loanType.substring(0, 2)) * 12 // 12 Months in year
      let monthlyRate = parseFloat((rate/100)/12) // 12 Months in year
      let monthlyPayment = Math.round(loan*(monthlyRate*Math.pow((1 + monthlyRate), numPayments))/(Math.pow((1 + monthlyRate), numPayments) - 1)) || 0

      setValues({...values, monthlyPayment: formatter.format(monthlyPayment)})
    }

    const downPaymentCalc = (type, value, housePrice) => {
      if (type === 'percent') {
        setValues({...values, downPayment: formatter.format(Math.round((value/100) * housePrice.replace(/,/g, ''))).replace('$', '')}) //divide by 100 to get it as a percent again
      }
      else {
        setValues({...values, downPaymentPerc: (value.replace(/,/g, '')/housePrice.replace(/,/g, '') * 100).toFixed(1)})
      }
    }

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

  useEffect(() => {
    monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zestimate, values.downPayment, values.downPaymentPerc, values.loanType, values.rate]);

  useEffect(() => {
    if (values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('amount', values.downPayment, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPayment]);

  useEffect(() => {
    if (!values.percActive) return //Don't want current textfield changing while the user is changing it
    downPaymentCalc('percent', values.downPaymentPerc, values.zestimate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.downPaymentPerc]);

  useEffect(() => {
   monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Typography>Principal & Interest</Typography>
        <Typography className='accordion-total'>{values.monthlyPayment}/Mo</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FormControl fullWidth>
        <TextField
            label='Home Price'
            variant='filled'
            name='zestimate'
            value={values.zestimate}
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
                label='Down Payment'
                variant='filled'
                name='downPayment'
                value={values.downPayment}
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
                name='downPaymentPerc'
                value={values.downPaymentPerc}
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
                label='Loan Program'
                variant='filled'
                name='loanType'
                value={values.loanType}
                fullWidth={true}
                onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label='Interest Rate'
                variant='filled'
                name='rate'
                value={values.rate}
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

export default PrincipalAndInterest
