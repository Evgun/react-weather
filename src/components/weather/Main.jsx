import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { receiveWeather, weatherSetCnt } from '../../redux/modules/weatherReducer';
import { findDateTime } from '../../services/findDateTime';
import { formatWeather, formatGlobalWeather } from '../../services/formatWeather';

function MainComponent({city, lat, lon, cnt, data, receiveWeather, weatherSetCnt, match}) {
  const [status, setStatus] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [weatherGlobalData, setWeatherGlobalData] = useState({});
  const iconURL = 'http://openweathermap.org/img/wn/';

  weatherSetCnt(match.params.cnt ? 40 : 8);
  useEffect(() => {
    if (city !== "")
    {
      receiveWeather({city, cnt});
    } else if (lat !== "") {
      receiveWeather({lat, lon, cnt});
    }
  }, [city, lat, lon, cnt]);

  useEffect(() => {
    if("city" in data)
    {
      setStatus(true);
      const dates = data.list.map((item) => {
        return new Date(item.dt_txt)
      });
      const curDateTimeId = findDateTime(dates);
      setWeatherData(formatWeather(data, curDateTimeId));
      if (cnt === 40) {
        setWeatherGlobalData(formatGlobalWeather(data));
      }
    } else {
      setStatus(false);
    }
  }, [data])

  return (
    <div className="section-weather">
      {status ? (
        <div className="section-weather__container">
          <div className="section-weather__header">
            <h1 className="section-weather__title">{weatherData.name}, {weatherData.country}</h1>
            <h3 className="section-weather__sub-title">{weatherData.date}</h3>
          </div>
          <div className="section-weather__info-container">
            <p className="section-weather__temp-info">{weatherData.temp}</p>
            <p className="section-weather__additional-info">Feels like: {weatherData.feelsLike}</p>
            <hr />
            <p className="section-weather__additional-info">Wind: {weatherData.wind}</p>
            <p className="section-weather__additional-info">Humidity: {weatherData.humidity}</p>
            <p className="section-weather__additional-info">Pressure: {weatherData.pressure}</p>
          </div>
          <div className="section-weather__sky-container">
            <img 
              className="section-weather__icon"
              src={iconURL + weatherData.icon + "@4x.png"}
              alt={weatherData.description}
            />
            <p className="section-weather__sky-info">{weatherData.main}</p>
          </div>
          {cnt === 8 ? (
            <div className="section-weather__day-length-container">
              <div className="section-weather__day-length-info">
                Sunrise: {weatherData.sunrise}
              </div>
              <div className="section-weather__day-length-info">
                Sunset: {weatherData.sunset}
              </div>
            </div>
          ) : (
            <div className="section-weather__forecast-container">
                {
                  weatherGlobalData.length >= 4 &&  weatherGlobalData.map((item) => {
                    return (
                      <div className="section-weather__forecast-item">
                        <h4 className="section-weather__forecast-header">{item.date}</h4>
                        <img 
                          className="section-weather__forecast-icon"
                          src={iconURL + item.icon + "@2x.png"}
                          alt={item.main}
                        />
                        <p className="section-weather__forecast-info">
                          {item.main}
                        </p>
                        <p className="section-weather__forecast-info">
                          {item.temp}
                        </p>
                      </div>
                    );
                  })
                }
            </div>
          )}
        </div>
        ) : (
          <p className="section-weather__info">No city selected</p>
        )
      }
      
    </div>
  );
}
  
function mapStateToProps(state) {
  return {
    city: state.weather.city,
    lat: state.weather.lat,
    lon: state.weather.lon,
    cnt: state.weather.cnt,
    data: state.weather.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receiveWeather: (value) => dispatch(receiveWeather(value)),
    weatherSetCnt: (value) => dispatch(weatherSetCnt(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

  