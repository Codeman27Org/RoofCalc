import React, { Component } from 'react'
import { MDBCol, MDBFormInline, MDBBtn } from 'mdbreact'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css'
import '../styles/SearchPage.css'

class SearchPage extends Component {
  search = (input) => {
    console.log(input)
  }

  render() {
    return (
      <MDBCol md='6'>
        <MDBFormInline className='md-form'>
          <GooglePlacesAutocomplete
            apiKey = 'AIzaSyCgNXXDm46LHt0rmgndPsBIrbIYNYLGsM8'
          />
        </MDBFormInline>
        <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => this.search('hello')}>
          Search
        </MDBBtn>
      </MDBCol>
    )
  }
}

export default SearchPage;
