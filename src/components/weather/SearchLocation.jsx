import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { filterCities } from '../../services/filterCities';
import { connect } from 'react-redux';
import { weatherSetLocation } from '../../redux/modules/weatherReducer';

function SearchComponent({ weatherSetLocation }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const setSearchOptions = (e) => {
    if(e.key === 'Enter')
    {
      weatherSetLocation(e.target.value);
      setInputValue(e.target.value);
    }
  };

  useEffect(debounce(() => {
    if(inputValue.length > 3)
      setFilteredCities(filterCities(inputValue));
    else
      setFilteredCities([]);
  }, 500), [inputValue]);

  return (
    <Autocomplete
      className="search-container"
      freeSolo
      disableClearable
      onKeyPress={setSearchOptions}
      onChange={(e, newValue) => {
        console.log(12);
        if(typeof newValue === "string") {
          setInputValue(newValue);
        }
      }}
      options={filteredCities.map((city) => city.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            type: 'search'
          }}
        />
      )}
    />
  );
}

function mapStateToProps(state) {
  return {
    weather: state.weather
  }
}

function mapDispatchToProps(dispatch) {
  return {
    weatherSetLocation: (value) => dispatch(weatherSetLocation(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);