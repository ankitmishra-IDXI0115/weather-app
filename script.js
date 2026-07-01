const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city");
const weatherDiv = document.querySelector("#weather");

// Fetch weather data from the API
async function getWeather(city) {

    const apiKey = "DT32FNA6JU5F36SSKNRN5G9KY";

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}&unitGroup=metric`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("City not found!");
    }

    return await response.json();
}

// Listen for the form submission
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    // Show a loading message while waiting for the API
    weatherDiv.innerHTML = `
        <div class="loading">
            ⏳ Fetching weather...
        </div>
    `;

    try {

        const data = await getWeather(city);

        weatherDiv.innerHTML = `
            <div class="weather-card">

                <h2>📍 ${data.address}</h2>

                <div class="temperature">
                    ${Math.round(data.currentConditions.temp)}°C
                </div>

                <div class="condition">
                    ${data.currentConditions.conditions}
                </div>

                <div class="details">

                    <div class="detail-card">
                        <h3>💧 Humidity</h3>
                        <p>${data.currentConditions.humidity}%</p>
                    </div>

                    <div class="detail-card">
                        <h3>💨 Wind</h3>
                        <p>${data.currentConditions.windspeed} km/h</p>
                    </div>

                </div>

                <div class="footer">
                    Last Updated: ${new Date().toLocaleTimeString()}
                </div>

            </div>
        `;

        cityInput.value = "";

    } catch (error) {

        weatherDiv.innerHTML = `
            <div class="error">

                <h2>❌ ${error.message}</h2>

                <p>Please enter a valid city name.</p>

            </div>
        `;

    }

});