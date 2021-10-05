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
function searchCity(city) {
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let submitCity = document.querySelector("#search-form");
submitCity.addEventListener("submit", handleSubmit);

function displayWeather(response) {
  let currentCity = document.querySelector("h2");
  currentCity.innerHTML = `${response.data.name}`;
  celsiusTemperature = response.data.main.temp;
  let cityTemperature = Math.round(celsiusTemperature);
  let currentTemperature = document.querySelector(".current-temperature");

  //Sky details:
  currentTemperature.innerHTML = `${cityTemperature}`;
  let skyDetails = document.querySelector(".sky-details");
  skyDetails.innerHTML = `${response.data.weather[0].description}`;

  //Max and min temperatures:
  let maxCityTemperature = Math.round(response.data.main.temp_max);
  let maxTemperature = document.querySelector(".current-max-temp");
  maxTemperature.innerHTML = `${maxCityTemperature}º`;

  let minCityTemperature = Math.round(response.data.main.temp_min);
  let minTemperature = document.querySelector(".current-min-temp");
  minTemperature.innerHTML = `${minCityTemperature}º`;

  //Icon:
  let iconElement = document.querySelector(".current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //RealFeel, Wind, Humidity:
  let cityRealFeel = Math.round(response.data.main.feels_like);
  let realFeelTemperature = document.querySelector(".real-feel-real-time");
  realFeelTemperature.innerHTML = `${cityRealFeel}º`;
  let cityWind = document.querySelector(".wind-real-time");
  let windRealTime = Math.round(response.data.wind.speed);
  cityWind.innerHTML = `${windRealTime}km/h`;
  let cityHumidity = document.querySelector(".humidity-real-time");
  let humidityRealTime = Math.round(response.data.main.humidity);
  cityHumidity.innerHTML = `${humidityRealTime}%`;

  //Sunrise and Sunset:
  function formatTime(timestamp) {
    let time = new Date(timestamp);
    let hours = time.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}h${minutes}`;
  }

  let sunriseDate = document.querySelector(".sunrise-real-time");
  sunriseDate.innerHTML = formatTime(response.data.sys.sunrise * 1000);

  let sunsetDate = document.querySelector(".sunset-real-time");
  sunsetDate.innerHTML = formatTime(response.data.sys.sunset * 1000);
}

//Celsius and Fahrenheit Conversion:
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Display Current User Location:
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

searchCity("Lisbon");
