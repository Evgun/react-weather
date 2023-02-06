import React, { useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { connect } from 'react-redux';
import { weatherSaveLocation, weatherSetLocation } from '../../redux/modules/weatherReducer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function FooterComponent({savedLocations, weatherSaveLocation, weatherSetLocation, city, data}) {

  function deleteFirstSavedLocation() {
    if(savedLocations.length > 0)
    {
      const newLocation = [...savedLocations]
      newLocation.shift()
      weatherSaveLocation(newLocation);
    }
  }

  return (
    <BottomNavigation
      value={city || ("city" in data ? data.city.name : "qqq")}
      onChange={(e, newLocation) => {
        weatherSetLocation(newLocation);
      }}
      showLabels
    >
      {savedLocations.length > 0 && 
        (
          savedLocations.map((item) => {
              return <BottomNavigationAction label={item.city} value={item.city} />;
          })
        )
      }
      <IconButton onClick={deleteFirstSavedLocation} aria-label="delete">
        <DeleteIcon fontSize="large" />
      </IconButton>
    </BottomNavigation>
  );
}

function mapStateToProps(state) {
  return {
    savedLocations: state.weather.savedLocations,
    data: state.weather.data,
    city: state.weather.city,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    weatherSaveLocation: (value) => dispatch(weatherSaveLocation(value)),
    weatherSetLocation: (value) => dispatch(weatherSetLocation(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterComponent);