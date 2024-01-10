function refreshWeather (response) {
    let tempElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let cityElement = document.querySelector("#city");
    let windElement = document.querySelector("#wind-speed");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let temperature = response.data.temperature.current;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    tempElement.innerHTML = Math.round(temperature);
    timeElement.innerHTML = formatDate(date);
}

function formatDate (date) {
    
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



let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);

searchCity("Kyiv");