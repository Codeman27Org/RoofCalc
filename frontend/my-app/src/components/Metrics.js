import React from 'react'

const Metrics = (props) => {
  return (
    <div className='metrics'>
      <div className = 'net-income'>
        <p className='metric-label'>Net Income</p>
        <p>$200.00</p>
      </div>
      <div className = 'coc-return'>
        <p className='metric-label'>CoC Return</p>
        <p>10%</p>
      </div>
      <div className = 'rent-ratio'>
        <p className='metric-label'>Rent Ratio</p>
        <p>1%</p>
      </div>
    </div>
  )
}

export default Metrics
