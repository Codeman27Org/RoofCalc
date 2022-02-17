import React from 'react'

const Demographics = (props) => {
  return (
    <div className='demographics'>
        <div className = 'median-income'>
          <p className='demographic-label'>Median Income</p>
          <p className='demographic-value'>${props.dataUsa['Household Income by Race'].toLocaleString('en-US')} (+{(props.dataUsa['Household Income by Race_Change'] * 100).toFixed(3)}%)</p>
        </div>
        <div className = 'population'>
          <p className='demographic-label'>Population</p>
          <p className='demographic-value'>{props.dataUsa['Population'].toLocaleString('en-US')} (+{(props.dataUsa['Population_Change'] * 100).toFixed(3)}%)</p>
        </div>
        <div className = 'jobs'>
          <p className='demographic-label'>Jobs</p>
          <p className='demographic-value'>{props.dataUsa['Workforce by Occupation and Gender'].toLocaleString('en-US')} (+{(props.dataUsa['Workforce by Occupation and Gender_Change'] * 100).toFixed(3)}%)</p>
        </div>
    </div>
  )
}

export default Demographics
