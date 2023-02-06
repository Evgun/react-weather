import React from 'react';
import ExploreIcon from '@material-ui/icons/Explore';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { weatherSetGeoLocation } from '../../redux/modules/weatherReducer';

function GetLocationComponent({weatherSetGeoLocation}) {
  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      weatherSetGeoLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }
  return (
    <Button
      className="btn btn-get-location"
      onClick={getGeoLocation}
      variant="contained"
      color="primary"
      size="large"
      startIcon={<ExploreIcon />}
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
    weatherSetGeoLocation: (value) => dispatch(weatherSetGeoLocation(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetLocationComponent);