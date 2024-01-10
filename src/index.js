function handleSearchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
}



let searchFormelement = document.querySelector("#search-form");
searchFormelement.addEventListener("submit", handleSearchSubmit);