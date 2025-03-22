// Function to fetch and display weather data without API key
const fetchWeather = (latitude, longitude) => {
  const url = `https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`;

  fetch(url)
    .then(response => response.json())
    .then(locations => {
      if (locations.length === 0) {
        throw new Error('Location not found!');
      }

      const locationId = locations[0].woeid;  // woeid is the unique location identifier
      const weatherUrl = `https://www.metaweather.com/api/location/${locationId}/`;

      return fetch(weatherUrl);
    })
    .then(response => response.json())
    .then(data => {
      const weatherBox = document.querySelector('.weather-box');
      const temperature = weatherBox.querySelector('.temperature');
      const description = weatherBox.querySelector('.decription');
      const customMessage = weatherBox.querySelector('.custom-message');
      const humidity = document.querySelector('.info-humidity span');
      const wind = document.querySelector('.info-wind span');

      // Use the current day's weather
      const weatherData = data.consolidated_weather[0];

      const weatherMap = {
        Clear: '../../assets/skye/clear.png',
        Rain: '../../assets/skye/rain.png',
        Snow: '../../assets/skye/snow.png',
        Clouds: '../../assets/skye/cloud.png',
        Haze: '../../assets/skye/mist.png'
      };

      let weatherImage;
      if (data.weather && data.weather.length > 0) {
        weatherImage = weatherMap[data.weather[0].main] || '../../assets/skye/clear.png';
      } else {
        weatherImage = '../../assets/skye/clear.png';
      }

      // Messages depending on temperature
      let tempMessage;
      if (weatherData.the_temp < -20) {
        tempMessage = 'Extremely cold! Stay warm and safe!';
      } else if (weatherData.the_temp < -10) {
        tempMessage = 'Very cold! Grab a thick coat and gloves!';
      } else if (weatherData.the_temp < 0) {
        tempMessage = 'Brrr, it\'s freezing! Stay warm!';
      } else if (weatherData.the_temp < 5) {
        tempMessage = 'It\'s chilly, grab a light jacket!';
      } else if (weatherData.the_temp < 10) {
        tempMessage = 'It\'s a bit cool, perfect for a walk!';
      } else if (weatherData.the_temp < 15) {
        tempMessage = 'Mild and pleasant, enjoy the day!';
      } else if (weatherData.the_temp < 20) {
        tempMessage = 'Perfect weather, not too hot or cold!';
      } else if (weatherData.the_temp < 25) {
        tempMessage = 'Warm and sunny, great for outdoor activities!';
      } else if (weatherData.the_temp < 30) {
        tempMessage = 'It\'s getting hot, stay hydrated!';
      } else if (weatherData.the_temp < 35) {
        tempMessage = 'Very hot! Stay cool and take breaks!';
      } else {
        tempMessage = 'Extremely hot! Stay safe and indoors!';
      }

      // Update UI elements
      const image = weatherBox.querySelector('img');
      image.src = weatherImage;
      description.innerHTML = weatherData.weather_state_name;
      customMessage.innerHTML = tempMessage;
      temperature.innerHTML = `${parseInt(weatherData.the_temp)}<span>°C</span>`;
      humidity.innerHTML = `${weatherData.humidity}%`;
      wind.innerHTML = `${weatherData.wind_speed} m/s`;

      // Show weather details
      weatherBox.style.display = 'block';
      document.querySelector('.weather-details').style.display = 'flex';
      weatherBox.classList.add('fadeIn');
      document.querySelector('.weather-details').classList.add('fadeIn');
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.querySelector('.weather-box').innerHTML = '<p class="error-message">Weather data not available</p>';
    });
};

// Fetch weather data for a location (example: latitude and longitude for New York)
fetchWeather(40.730610, -73.935242);
