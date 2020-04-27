import React from 'react'
import { MDBCol, MDBFormInline, MDBBtn } from 'mdbreact'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css'
import '../styles/SearchPage.css'

const SearchPage = (props) => {
    return (
      <MDBCol className='search-page' md='12'>
        <h1><span className='roof'>Logo</span>\Here</h1>
        <MDBFormInline className='md-form'>
          <GooglePlacesAutocomplete
            autocompletionRequest={{
                componentRestrictions: {
                  country: ['us'],
                }
            }}
          />
        </MDBFormInline>
        <div className='text-center'>
          <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => props.search(props.inputAddress)}>
            Search
          </MDBBtn>
        </div>
      </MDBCol>
    )
}

export default SearchPage;
