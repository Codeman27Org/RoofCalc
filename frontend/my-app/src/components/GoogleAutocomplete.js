import React, { useState, useEffect, useRef } from "react";
import {InputAdornment, TextField} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const GoogleAutocomplete = (props) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ['address'], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  const handlePlaceSelect = (updateQuery) => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
  }

  useEffect(() => {
    props.updateAddress(query)
  }, [query])

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCgNXXDm46LHt0rmgndPsBIrbIYNYLGsM8&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className='search-div'>
      <HighlightOffIcon className='delete-icon'/>
      <input
        className='search-location-input'
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Address..."
        value={query}
      />
    </div>
  );
}

export default GoogleAutocomplete;
