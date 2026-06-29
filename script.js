const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city");
const weatherDiv = document.querySelector("#weather");

async function getWeather(city) {

    const apiKey = "DT32FNA6JU5F36SSKNRN5G9KY";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
}

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value;

    const data = await getWeather(city);

    weatherDiv.innerHTML = `
        <h2>${data.address}</h2>

        <p>Temperature : ${data.currentConditions.temp} °C</p>

        <p>Conditions : ${data.currentConditions.conditions}</p>

        <p>Humidity : ${data.currentConditions.humidity}%</p>

        <p>Wind Speed : ${data.currentConditions.windspeed} km/h</p>
    `;
});