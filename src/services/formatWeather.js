import moment from 'moment';

export function formatWeather(data, id) {
  const list = data.list[id];
  const curWeather = {
    name: data.city.name,
    date: moment(list.dt_txt).format('dd D MMMM'),
    country: data.city.country,
    feelsLike: Math.round(list.main.feels_like) + "°C",
    main: list.weather[0].main,
    icon: list.weather[0].icon,
    description: list.weather[0].description,
    temp: Math.round(list.main.temp) + "°C",
    wind: list.wind.speed + ' km/h',
    humidity: list.main.humidity + "%",
    pressure: list.main.pressure + " hPa",
    sunrise: moment(data.city.sunrise*1000).format('HH:mm'),
    sunset: moment(data.city.sunset*1000).format('HH:mm'),
  };
  return curWeather;
}

export function formatGlobalWeather(data) {
  const date = moment(Date.now());
  var today = date.set({
    'hour' : 12,
    'minute'  : 0, 
    'second' : 0
  });
  today = today.add(1, 'days');
  const globalWeatherData = [];
  for(let i = 0; i < data.list.length; i++)
  {
    if(moment(data.list[i].dt_txt).isSame(today.toDate().toString()))
    {
      globalWeatherData.push(
        {
          date: moment(data.list[i].dt_txt).format('dd D MMMM'),
          icon: data.list[i].weather[0].icon,
          main: data.list[i].weather[0].main,
          temp: Math.round(data.list[i].main.temp) + " / " + Math.round(data.list[i].main.feels_like) + "°C",
        }
      );
      today.add(1, 'days');
    }
  }
  return(globalWeatherData);
}