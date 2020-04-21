import React from 'react'
import { MDBCol, MDBBtn } from 'mdbreact'

const Results = (props) => {
  return (
    <MDBCol md='6'>
      Hello
      <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => props.switch()}>
        Back
      </MDBBtn>
    </MDBCol>
  )
}

export default Results
