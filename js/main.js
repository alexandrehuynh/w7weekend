function getWeatherData() {
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
        const forecast = data.list[0];
        const tempHigh = forecast.main.temp_max;
        const tempLow = forecast.main.temp_min;
        const description = forecast.weather[0].description;
        const humidity = forecast.main.humidity;
      
        // Convert Kelvin to Fahrenheit if necessary
        const highF = ((tempHigh - 273.15) * 9/5 + 32).toFixed(2);
        const lowF = ((tempLow - 273.15) * 9/5 + 32).toFixed(2);
      
        document.getElementById('weatherDisplay').innerHTML = `
          <h2>Forecast: ${description}</h2>
          <p>High: ${highF}°F</p>
          <p>Low: ${lowF}°F</p>
          <p>Humidity: ${humidity}%</p>
        `;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        // Handle the UI for errors here
        document.getElementById('weatherDisplay').textContent = 'Error: ' + error.message;
      });
  }
  
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    // Attach the event listener to the button instead of the input
    document.getElementById('getWeatherButton').addEventListener('click', getWeatherData);
  });
  