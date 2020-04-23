import React from 'react'
import { MDBCol, MDBBtn } from 'mdbreact'

const Results = (props) => {
  return (
    <MDBCol md='6'>
      <h1><span className='roof'>Logo</span>\Here</h1>
      <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => props.switch()}>
        Back
      </MDBBtn>
    </MDBCol>
  )
}

export default Results
