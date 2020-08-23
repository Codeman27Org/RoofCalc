import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import GoogleAutocomplete from './GoogleAutocomplete'
import logo from '../RoofCalc.png'

const SearchPage = (props) => {
    const [values, setValues] = useState({
        disabled: false
    })

    const disableButton = (action = 'nothing') => {
      if (action === 'search'){
        setValues((values) => ({...values, disabled: true}))
      }
      else {
        setValues((values) => ({...values, disabled: false}))
      }
    }

    const handleClick = () => {
      disableButton('search')
      props.search(props.inputAddress)
    }

    return (
      <div className='search'>
        <div className='search-section'>
          <img src={logo} alt='logo' className='logo'/>
          <p className='app-description'>Analyze investment properties</p>
          <GoogleAutocomplete
            updateAddress={props.updateAddress}
            badAddress={props.badAddress}
            updateError={props.updateError}
            disableButton={disableButton}
            disabled={values.disabled}
          />
        {values.disabled && !props.badAddress && <LinearProgress style={{ width: '80%' }} />}
        </div>
        <div className='search-button'>
          <Button variant='outlined' color='primary' onClick={handleClick}
            disabled={values.disabled && !props.badAddress}>
            Search
          </Button>
        </div>
      </div>
    )
}

export default SearchPage;
