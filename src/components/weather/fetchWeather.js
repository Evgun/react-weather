import axios from 'axios';

const API_Key = '8ee8b4ba76eb25c423ef26a2d2585827';
const URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async ( { city, lat, lon, cnt = 8 } ) => {
  try {
    if (city) {
      const {data} = await axios.get(URL, {
        params: {
          q: city, 
          units: 'metric',
          APPID: API_Key,
          cnt
        }
      });
      return data;
    } else if (lat && lon) {
      const {data} = await axios.get(URL, {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          APPID: API_Key,
          cnt
        }
      });
      return data;
    }
    
  } catch(err) {
    return err;
  }
}