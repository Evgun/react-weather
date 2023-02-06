import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { weatherSaveLocation } from '../../redux/modules/weatherReducer';

function SaveComponent({weatherSaveLocation, city, lat, data, savedLocations}) {

  function saveLocation() {
    var cityName = '';
    if (lat)
    {
      cityName = data.city.name
    }
    if(city || cityName)
    {
      if(savedLocations.length >= 1 && savedLocations.length < 5)
      {
        let f = true;
        savedLocations.map((item) => {
          if(item.city === (city || cityName))
            f = false;
        })
        if(f)
        {
          const newLocation = [...savedLocations]
          newLocation.unshift({city: (city || cityName)})
          weatherSaveLocation(newLocation);
        }
      } else {
        weatherSaveLocation([{city: (city || cityName)}]);
      }
    }
  }

  return (
    <Button
      className="btn btn-save"
      onClick={saveLocation}
      variant="contained"
      color="primary"
      size="large"
      startIcon={<SaveIcon />}
    />
  );
}

  
function mapStateToProps(state) {
  return {
    city: state.weather.city,
    data: state.weather.data,
    lat: state.weather.lat,
    savedLocations: state.weather.savedLocations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    weatherSaveLocation: (value) => dispatch(weatherSaveLocation(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveComponent);
