import React from 'react'

const Metrics = (props) => {
  return (
    <div className='metrics'>
      <div className = 'net-income'>
        <p className='metric-label'>Net Income</p>
        <p className='metric-value'>$200</p>
      </div>
      <div className = 'coc-return'>
        <p className='metric-label'>CoC Return</p>
        <p className='metric-value'>10%</p>
      </div>
      <div className = 'rent-ratio'>
        <p className='metric-label'>Rent Ratio</p>
        <p className='metric-value'>{isFinite(props.values.rentRatio) ? props.values.rentRatio : 0}%</p>
      </div>
    </div>
  )
}

export default Metrics
