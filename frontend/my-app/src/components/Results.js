import React from 'react'
import { Button } from '@material-ui/core'
import PrincipalAndInterest from './PrincipalAndInterest'

const Results = (props) => {
  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='accordion-area'>
        <PrincipalAndInterest
          values = {props.results}
        />
      </div>
      <div className='button-box'>
        <Button variant='outlined' color='primary' onClick={() => props.switch()}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default Results
