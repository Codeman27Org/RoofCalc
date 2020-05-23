import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const PrincipalAndInterest = (props) => {
  const [values, setValues] = React.useState({
      zestimate: props.values.zestimates.zestimate.toLocaleString('en-US'),
      downPayment: props.values.monthly_mortgage.down_payment.toLocaleString('en-US'),
      downPaymentPerc: props.values.monthly_mortgage.down_payment_perc * 100,
      loanType: props.values.mortgage_rate.loan_type,
      rate: (props.values.mortgage_rate.rate * 100).toString().slice(0,5),
      monthlyPayment: ''
    })

    React.useEffect(() => {
     monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
    }, []);

    React.useEffect(() => {
      monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate)
    }, [values.zestimate, values.downPayment, values.downPaymentPerc, values.loanType, values.rate]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  const monthlyPaymentCalc = (housePrice, downPayment, loanType, rate) => {
    let loan = housePrice.toString().replace(/,/g, '') - downPayment.toString().replace(/,/g, '')
    let numPayments = parseInt(loanType.substring(0, 2)) * 12 // 12 Months in year
    let monthlyRate = parseFloat((rate/100)/12) // 12 Months in year
    let monthlyPayment = Math.round(loan*(monthlyRate*Math.pow((1 + monthlyRate), numPayments))/(Math.pow((1 + monthlyRate), numPayments) - 1))

    setValues({...values, monthlyPayment: formatter.format(monthlyPayment)})
  }

  const handleChange = (event, value) => {
    if (event.target.name === 'zestimate' || event.target.name === 'downPayment') {
      setValues({ ...values, [event.target.name]: formatter.format(event.target.value.toString().replace(/,/g, '')).toString().replace('$', '')},
        monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate))
    } else {
      setValues({ ...values, [event.target.name]: event.target.value},
        monthlyPaymentCalc(values.zestimate, values.downPayment, values.loanType, values.rate))
    }
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
                onChange={(event, value)=> handleChange(event, value)}
            />
            <TextField
                label='Interest Rate'
                variant='filled'
                name='rate'
                value={values.rate}
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
