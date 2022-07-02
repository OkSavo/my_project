let now = new Date();
let currentDate = now.toLocaleDateString();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentTime = now.toLocaleTimeString();
let formatDate = document.querySelector("#current-day");
formatDate.innerHTML = `${currentDay}, ${currentDate}`;
let formatTime = document.querySelector("#current-time");
formatTime.innerHTML = `Time: ${currentTime}`;

function showWeather(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = response.data.name;
  let currecntHumidity = document.querySelector("#current-humidity");
  currecntHumidity.innerHTML = response.data.main.humidity;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  console.log(response);
}
function currentCitySearch(city) {
  let apiKey = "a60b931947ef27861e5c5ca7e5bbaf05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleCitySearch(event) {
  event.preventDefault();

  let city = document.querySelector("#cityInput").value;
  currentCitySearch(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a60b931947ef27861e5c5ca7e5bbaf05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityEnter = document.querySelector("#formCity");
cityEnter.addEventListener("submit", handleCitySearch);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

currentCitySearch("London");
