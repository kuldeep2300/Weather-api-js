// to get the actual country name
let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humadity = document.querySelector(".weather_humadity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

// to get the date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // converting into miliseconds
  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-Us", options);
  return formatter.format(curDate);
};

const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// search functionality
let city = "kota";

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city_name");
  console.log(cityName.value);
  city = cityName.value;

  getWeatherData();

  cityName.value;
});

const getWeatherData = async () => {
  //define the getWeather function here
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=06b11a55c68af32c0c83e40741710dcb`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);
    const { main, name, weather, wind, sys, dt } = data;
    console.log(sys);
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    //? Weather Main Data
    let temp = main.temp - 273.15;
    let min = main.temp_min - 273.15;
    let max = main.temp_max - 273.15;

    w_temperature.innerHTML = `${temp.toFixed(2)}&#176C`;
    w_minTem.innerHTML = `Min : ${min.toFixed()}&#176C`;
    w_maxTem.innerHTML = `Max : ${max.toFixed()}&#176C`;

    //? Weather Extra Data
    let feelsLike = main.feels_like - 273.15;

    w_feelsLike.innerHTML = `${feelsLike.toFixed(2)}&#176`;
    w_humadity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hpa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
