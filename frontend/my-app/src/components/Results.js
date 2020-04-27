import React from 'react'
import { MDBCol, MDBBtn } from 'mdbreact'

const Results = (props) => {
  return (
    <MDBCol md='12'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <div className='text-center'>
        <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => props.switch()}>
          Back
        </MDBBtn>
      </div>
    </MDBCol>
  )
}

export default Results
