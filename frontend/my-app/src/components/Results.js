import React from 'react'
import { Button } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import PrincipalAndInterest from './PrincipalAndInterest'

const Results = (props) => {
  const [values, setValues] = React.useState({
      zestimate: props.results.zestimates.zestimate
    })

  return (
    <div className='results'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='accordion-area'>
        <PrincipalAndInterest
          values = {values}
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
