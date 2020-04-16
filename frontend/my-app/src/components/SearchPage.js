import React, { Component } from 'react'
import { MDBCol, MDBFormInline, MDBBtn } from 'mdbreact'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css'
import '../styles/SearchPage.css'

class SearchPage extends Component {
  state = {
    address: 'dfdfd'
  }

  search = (input) => {
    console.log(input)
    this.setState({address: input.description})
  }

  render() {
    return (
      <MDBCol md='6'>
        <MDBFormInline className='md-form'>
          <GooglePlacesAutocomplete
            onSelect={(e) => this.search(e)}
            changeValue={(e) => console.log(e)}
            onChangeText= { (text) =>  console.log(text) }
            autocompletionRequest={{
                componentRestrictions: {
                  country: ['us'],
                }
            }}
          />
        </MDBFormInline>
        <MDBBtn outline color='teal' rounded size='sm' type='submit' className='mr-auto rounded-pill' onClick={() => this.search(this.state.address)}>
          Search
        </MDBBtn>
      </MDBCol>
    )
  }
}

export default SearchPage;
