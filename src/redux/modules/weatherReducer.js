import { fetchWeather } from '../../components/weather/fetchWeather';

const WEATHER_SET_LOCATION = 'WEATHER_SET_LOCATION';
const WEATHER_SET_CNT = 'WEATHER_SET_CNT';
const WEATHER_SET_GEOLOCATION = 'WEATHER_SET_GEOLOCATION';
const WEATHER_RECEIVE = 'WEATHER_RECEIVE';
const WEATHER_SAVE_LOCATION = 'WEATHER_SAVE_LOCATION';


export function weatherSetLocation(value){
  return {
    type: WEATHER_SET_LOCATION,
    payload: value
  };
}

export function weatherSaveLocation(value){
  return {
    type: WEATHER_SAVE_LOCATION,
    payload: value
  };
}

export function weatherSetCnt(value){
  return {
    type: WEATHER_SET_CNT,
    payload: value
  };
}

export function weatherSetGeoLocation(value){
  return {
    type: WEATHER_SET_GEOLOCATION,
    payload: value
  };
}

export function receiveWeather(value){
  return async dispatch => {
    const data = await fetchWeather(value);
    dispatch({
      type: WEATHER_RECEIVE,
      payload: data
    });
  }
}

const initialState = {
  city: '',
  cnt: 8,
  lat: '',
  lon: '',
  data: {},
  savedLocations: []
};

export default function reducer(state = initialState, action){
  switch (action.type){
  case WEATHER_SET_LOCATION:
    return ({...state, city: action.payload, lat: '', lon: ''});
  case WEATHER_SET_CNT:
    return ({...state, cnt: action.payload});
  case WEATHER_SET_GEOLOCATION:
    return ({...state, city: '', lat: action.payload.lat, lon: action.payload.lon});
  case WEATHER_RECEIVE:
    return ({...state, data: action.payload});
  case WEATHER_SAVE_LOCATION:
    return ({...state, savedLocations: action.payload});
  default:
    return state;
  }
}