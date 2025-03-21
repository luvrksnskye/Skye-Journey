// Function to fetch and display weather data
const fetchWeather = (latitude, longitude) => {
  const APIKey = '9c8e485656ec0f2b1f01e48f6367b40f';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Handle the JSON response here
      const weatherBox = document.querySelector('.weather-box');
      const temperature = weatherBox.querySelector('.temperature');
      const customMessage = weatherBox.querySelector('.custom-message');
      const humidity = document.querySelector('.humidity span');
      const wind = document.querySelector('.wind span');

      // Map weather conditions to images
      const weatherMap = {
        Clear: '../assets/skye/clear.png',
        Rain: '../assets/skye/rain.png',
        Snow: '../assets/skye/snow.png',
        Clouds: '../assets/skye/cloud.png',
        Haze: '../assets/skye/mist.png'
      };

      let weatherImage;
      if (data.weather && data.weather.length > 0) {
        weatherImage = weatherMap[data.weather[0].main] || '../assets/skye/clear.png';
      } else {
        weatherImage = '../assets/skye/clear.png';
      }

      // Messages depending on temperature
      let tempMessage;
      if (data.main.temp < -20) {
        tempMessage = 'Extremely cold! Stay warm and safe!';
      } else if (data.main.temp < -10) {
        tempMessage = 'Very cold! Grab a thick coat and gloves!';
      } else if (data.main.temp < 0) {
        tempMessage = 'Brrr, it\'s freezing! Stay warm!';
      } else if (data.main.temp < 5) {
        tempMessage = 'It\'s chilly, grab a light jacket!';
      } else if (data.main.temp < 10) {
        tempMessage = 'It\'s a bit cool, perfect for a walk!';
      } else if (data.main.temp < 15) {
        tempMessage = 'Mild and pleasant, enjoy the day!';
      } else if (data.main.temp < 20) {
        tempMessage = 'Perfect weather, not too hot or cold!';
      } else if (data.main.temp < 25) {
        tempMessage = 'Warm and sunny, great for outdoor activities!';
      } else if (data.main.temp < 30) {
        tempMessage = 'It\'s getting hot, stay hydrated!';
      } else if (data.main.temp < 35) {
        tempMessage = 'Very hot! Stay cool and take breaks!';
      } else {
        tempMessage = 'Extremely hot! Stay safe and indoors!';
      }

      const image = weatherBox.querySelector('img');
      image.src = weatherImage;
      customMessage.innerHTML = tempMessage;
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} m/s`;

      weatherBox.style.display = '';
      document.querySelector('.weather-details').style.display = '';
      weatherBox.classList.add('fadeIn');
      document.querySelector('.weather-details').classList.add('fadeIn');
      document.querySelector('#forecast-window-3 .container').style.height = '590px';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.querySelector('#forecast-window-3 .not-found').style.display = 'block';
      document.querySelector('#forecast-window-3 .not-found').classList.add('fadeIn');
    });
};

// Get the weather data for Richmond, Indiana, USA
fetchWeather(39.8283, -84.8903);
