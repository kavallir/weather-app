function refreshWeather (response) {
    let tempElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    // let emojiElement = document.querySelector("#emoji")
    cityElement.innerHTML = response.data.city;
    // emojiElement.innerHTML = response.data.icon;
    tempElement.innerHTML = Math.round(temperature);
    
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