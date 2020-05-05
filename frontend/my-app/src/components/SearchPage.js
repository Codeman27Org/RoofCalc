import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css'
import '../styles/SearchPage.css'
import { Button } from '@material-ui/core'

const SearchPage = (props) => {
    return (
      <div className='search-page'>
        <h1><span className='roof'>Logo</span>\Here</h1>
        <div className='md-form'>
          <GooglePlacesAutocomplete
            onSelect={({ description }) => (
                props.updateAddress(description)
              )}
            onChange={() => {console.log('change')}}
            autocompletionRequest={{
                componentRestrictions: {
                  country: ['us'],
                }
            }}
          />
        </div>
        <div className='text-center'>
          <Button variant='outlined' color='primary' onClick={() => props.search(props.inputAddress)}>
            Search
          </Button>
        </div>
      </div>
    )
}

export default SearchPage;
