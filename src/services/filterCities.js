import citiesJSON from '../city.list.json'

export function filterCities(cityName) {
  return citiesJSON.filter((city) =>
    city.name.toLowerCase().includes(cityName.toLowerCase())
  );
}