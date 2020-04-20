import React from 'react'
import { MDBCol, MDBFormInline, MDBBtn } from 'mdbreact'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css'
import '../styles/SearchPage.css'

const SearchPage = (props) => {
    return (
      <MDBCol md='6'>
        <MDBFormInline className='md-form'>
          <GooglePlacesAutocomplete
            onSelect={(e) => props.search(e.description)}
            autocompletionRequest={{
                componentRestrictions: {
                  country: ['us'],
                }
            }}
          />
        </MDBFormInline>
        <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => props.search(props.inputAddress)}>
          Search
        </MDBBtn>
      </MDBCol>
    )
}

export default SearchPage;
