const CITIES = 'cities';

export const getCities = () => {
  return JSON.parse(window.localStorage.getItem(CITIES)) || [];
}

export const getCityName = placeId => {
  let cities = getCities();
  return cities.find(city => city.placeId === placeId).name;
}

export const addCity = (name, placeId) => {
  let cities = getCities();
  cities.push({ name, placeId })
  window.localStorage.setItem(CITIES, JSON.stringify(cities))
  console.log(`${name} with a placeId of ${placeId} added to list of ${cities.length} cities`)
}

export const removeCity = placeId => {
  let cities = getCities()
  cities = cities.filter(city => city.placeId !== placeId)
  window.localStorage.setItem(CITIES, JSON.stringify(cities))
  console.log(`${placeId} removed from list of ${cities.length} cities`)
}