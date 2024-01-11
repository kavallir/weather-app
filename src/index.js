function refreshWeather (response) {
    let tempElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let cityElement = document.querySelector("#city");
    let windElement = document.querySelector("#wind-speed");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon")
    let date = new Date (response.data.time * 1000);
    let temperature = response.data.temperature.current;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    tempElement.innerHTML = Math.round(temperature);
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="" /> `;
    getForecast(response.data.city);
}

function formatDate(date) {
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        `Sunday`, 
        `Monday`, 
        `Tuesday`, 
        `Wednesday`, 
        `Thursday`, 
        `Friday`, 
        `Saturday`
    ];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function searchCity (city) {
let apiKey = "fea658ob71c06a80c3410a8at40a9b7a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather)
}

function handleSearchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }

function getForecast (city) {
    let apiKey = "fea658ob71c06a80c3410a8at40a9b7a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}


function displayForecast (response) {
    let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max">
            <strong>${Math.round(day.temperature.maximum)}º /</strong>
          </div>
          <div class="weather-forecast-temperature-min"> ${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>`
    }
    });
    let forecastElement = document.querySelector("#forecast")
    forecastElement.innerHTML = forecastHtml;
    };
    

let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);

searchCity("Kyiv");