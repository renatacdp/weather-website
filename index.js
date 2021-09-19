//date and clock
let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${month} ${date} | ${hours}h${minutes}`;

//search city

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let submitCity = document.querySelector("#search-form");
submitCity.addEventListener("submit", searchCity);

function displayWeather(response) {
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = `${response.data.name}`;
  let cityTemperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");

  //Sky details:
  currentTemperature.innerHTML = `${cityTemperature}ºC`;
  let skyDetails = document.querySelector(".sky-details");
  skyDetails.innerHTML = `${response.data.weather[0].description}`;

  //Max and min temperatures:
  let maxCityTemperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector(".current-max-temp");
  maxTemperature.innerHTML = `${maxCityTemperature}º`;

  let minCityTemperature = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector(".current-min-temp");
  minTemperature.innerHTML = `${minCityTemperature}º`;

  //RealFeel, Wind, Humidity: (% of Rain, Sunrise and Sunset not currently working)
  let cityRealFeel = Math.round(response.data.main.feels_like);
  let realFeelTemperature = document.querySelector(".real-feel-real-time");
  realFeelTemperature.innerHTML = `${cityRealFeel}º`;
  let cityWind = document.querySelector(".wind-real-time");
  let windRealTime = Math.round(response.data.wind.speed);
  cityWind.innerHTML = `${windRealTime}km/h`;
  let cityHumidity = document.querySelector(".humidity-real-time");
  let humidityRealTime = Math.round(response.data.main.humidity);
  cityHumidity.innerHTML = `${humidityRealTime}%`;
}

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocationEvent(position) {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocationEvent);
