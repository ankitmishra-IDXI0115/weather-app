const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city");
const weatherDiv = document.querySelector("#weather");

async function getWeather(city) {

    const apiKey = "DT32FNA6JU5F36SSKNRN5G9KY";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=metric`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("City not found");
    }

    return await response.json();
}

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value;

    weatherDiv.innerHTML = "<h2>Loading...</h2>";

    try {

        const data = await getWeather(city);

        weatherDiv.innerHTML = `
            <h2>${data.address}</h2>

            <p>🌡 Temperature : ${data.currentConditions.temp} °C</p>

            <p>☁ Condition : ${data.currentConditions.conditions}</p>

            <p>💧 Humidity : ${data.currentConditions.humidity}%</p>

            <p>💨 Wind Speed : ${data.currentConditions.windspeed} km/h</p>
        `;

    } catch (error) {

        weatherDiv.innerHTML = `<h2>${error.message}</h2>`;

    }

});