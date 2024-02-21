function getWeatherData() {

    // Clear any previous error messages
    document.getElementById('weatherDisplay').textContent = '';

    const location = document.getElementById('locationInput').value;
    const apiKey = '4c3c2f072539b24766caea7157784667';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        const cityName = data.city.name;
        const population = data.city.population;
        const forecast = data.list[0];
        const tempHigh = forecast.main.temp_max;
        const tempLow = forecast.main.temp_min;
        const description = forecast.weather[0].description;
        const humidity = forecast.main.humidity;
        const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();
        const timezone = data.city.timezone;
        const feelsLike = data.list[0].main.feels_like;
        const iconCode = data.list[0].weather[0].icon;
        
      
        // Convert Kelvin to Fahrenheit if necessary
        const highF = ((tempHigh - 273.15) * 9/5 + 32).toFixed(2);
        const lowF = ((tempLow - 273.15) * 9/5 + 32).toFixed(2);
        const feelsLikeF = ((feelsLike - 273.15) * 9/5 + 32).toFixed(2);

        document.getElementById('weatherBasicInfo').innerHTML = `
        <h2>${cityName}</h2>
        <p>Population: ${population}</p>
        <p>Timezone: GMT${timezone / 3600}</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
        `;
    
    document.getElementById('weatherDetails').innerHTML = `
        <h3>Forecast: ${description}</h3>
        <p>High: ${highF}°F</p>
        <p>Low: ${lowF}°F</p>
        <p>Feels Like: ${feelsLikeF}°F</p>
        <p>Humidity: ${humidity}%</p>
        <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
        `;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Handle the UI for errors here
        document.getElementById('weatherDisplay').textContent = 'Error: ' + error.message;
      });
  }

  function getCityImage(cityName) {
    const accessKey = 'Rzv2tSGrFwf4LxvXUPZqSg9K5pqmX0Wv5SyIQDQRoc8'; 
    const url = `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=${accessKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Photo fetch response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                const imageUrl = data.results[0].urls.regular;
                const cityImageElem = document.getElementById('cityImage');
                if (cityImageElem) {
                    cityImageElem.src = imageUrl;
                }
            } else {
                console.log('No images found for this city');
            }
        })
        .catch(error => {
            console.error('There has been a problem with fetching city image:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getWeatherButton').addEventListener('click', function() {
        const cityName = document.getElementById('locationInput').value.trim();
        getWeatherData();
        getCityImage(cityName);
    });
});
// widget doesn't support dynamic

//   function setupWeatherWidget(cityId, apiKey) {
//     // Clear any existing widget script
//     document.getElementById('openweathermap-widget-11').innerHTML = "";
//     const existingScript = document.getElementById('owm-widget-script');
//     if (existingScript) {
//         existingScript.remove();
//     }

//     // Define the widget parameters with the new city ID
//     window.myWidgetParam = [{
//         id: 11,
//         cityid: cityId,
//         appid: apiKey,
//         units: 'imperial',
//         containerid: 'openweathermap-widget-11',
//     }];

//     // Create a new script element for the widget
//     var script = document.createElement('script');
//     script.id = 'owm-widget-script'; // Assign an ID for future reference
//     script.async = true;
//     script.charset = "utf-8";
//     script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
//     document.body.appendChild(script);
// }
