import React from 'react'

const Metrics = (props) => {
  return (
    <div className='metrics'>
        <div className = 'net-income'>
          <p className='metric-label'>Net Income</p>
          <p className='metric-value'>{Math.sign(props.values.netIncome) === -1 ? `-$${Math.abs(props.values.netIncome)}` : `$${props.values.netIncome}`}</p>
        </div>
        <div className = 'coc-return'>
          <p className='metric-label'>CoC Return</p>
          <p className='metric-value'>{isFinite(props.values.cashOnCashReturn) ? props.values.cashOnCashReturn : 0}%</p>
        </div>
        <div className = 'rent-ratio'>
          <p className='metric-label'>Cap Rate</p>
          <p className='metric-value'>{isFinite(props.values.capRate) ? props.values.capRate : 0}%</p>
        </div>
    </div>
  )
}

export default Metrics
