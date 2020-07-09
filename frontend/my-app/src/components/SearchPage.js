import React, {useState, useEffect} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css'
import '../styles/SearchPage.css'
import { Button, InputAdornment } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'

const SearchPage = (props) => {
    const [values, setValues] = useState({
        disabled: false
    })

    const handleClick = () => {

      setValues((values) => ({...values, disabled: true}))
      props.search(props.inputAddress)
    }

    return (
      <div className='search-page'>
        <div className='search-section'>
          <h1><span className='roof'>Logo</span>\Here</h1>
          <div className='md-form'>
            <GooglePlacesAutocomplete
              onSelect={({ description }) => (
                  props.updateAddress(description)
                )}
              className='input-field'
              onChange={() => {console.log('change')}}
              autocompletionRequest={{
                  componentRestrictions: {
                    country: ['us'],
                  }
              }}
              InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <p>%</p>
                    </InputAdornment>
                  ),
                }}
            />
          {values.disabled && <LinearProgress />}
          </div>
        </div>
        <div className='search-button'>
          <Button variant='outlined' color='primary' onClick={handleClick}
            disabled={values.disabled}>
            Search
          </Button>
        </div>
      </div>
    )
}

export default SearchPage;
