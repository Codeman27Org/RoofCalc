import React from 'react'

const Demographics = (props) => {
  return (
    <div className='demographics'>
        <div className = 'median-income'>
          <p className='demographic-label'>Median Income</p>
          <p className='demographic-value'>$53,000 (+8.14%)</p>
        </div>
        <div className = 'crime-rate'>
          <p className='demographic-label'>Crime Rate</p>
          <p className='demographic-value'>94.97 (5.2)</p>
        </div>
        <div className = 'population'>
          <p className='demographic-label'>Pop. Growth</p>
          <p className='demographic-value'>392,905 (+1.94%)</p>
        </div>
        <div className = 'jobs'>
          <p className='demographic-label'>Job Growth</p>
          <p className='demographic-value'>191,406 (-0.721%)</p>
        </div>
    </div>
  )
}

export default Demographics
