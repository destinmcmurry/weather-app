const CITIES = 'cities';

export const getCities = () => {
  return JSON.parse(window.localStorage.getItem(CITIES)) || [];
}

export const getCity = placeId => {
  let cities = getCities();
  return cities.find(city => city.placeId === placeId);
}

export const addCity = (name, placeId, lat, lng) => {
  let cities = getCities();
  cities.push({ name, placeId, lat, lng, weather: {} })
  window.localStorage.setItem(CITIES, JSON.stringify(cities))
  console.log(`${name} added to list of ${cities.length} cities`)
}

export const removeCity = placeId => {
  let cities = getCities()
  cities = cities.filter(city => city.placeId !== placeId)
  window.localStorage.setItem(CITIES, JSON.stringify(cities))
  console.log(`${placeId} removed from list. ${cities.length} cities remaining`)
}

export const updateWeather = (placeId, temp, high, low, icon, description, humidity, pressure, code) => {
  let cities = getCities();
  cities = cities.map(city => {
    if (city.placeId === placeId) {
      city.weather.temp = temp;
      city.weather.icon = icon;
      city.weather.description = description;
      city.weather.high = high;
      city.weather.low = low;
      city.weather.humidity = ''+humidity;
      city.weather.pressure = ''+pressure;
      city.weather.code = code;
    }
    return city;
  });
  window.localStorage.setItem(CITIES, JSON.stringify(cities));
  console.log(`weather updated`);
}

export const updateForecast = (placeId, days) => {
  let cities = getCities()
  cities = cities.map(city => {
    if (city.placeId === placeId) {
      city.forecast = days;
    }
    return city;
  });
  window.localStorage.setItem(CITIES, JSON.stringify(cities));
  console.log(`forecast updated`);
}

export const getDayOfWeek = i => {
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return weekdays[i];
}

export const getVerdict = (temp, code) => {
  temp = +temp;
  if (temp > 95 || temp < 30 || code === 502 || code === 503 || code === 504 || code === 511 || code === 522 || code === 531 || code < 233 || code === 602 || code === 622 || code === 711 || code === 731 || code === 762 || code === 781) {
    return 'nope';
  } else if (code >= 800 && temp > 45) {
    return 'yep';
  } else {
    return 'eh';
  }
}