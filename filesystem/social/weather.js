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

      const weatherBox = document.querySelector('.weather-box');
      const temperature = weatherBox.querySelector('.temperature');
      const description = weatherBox.querySelector('.decription');
      const customMessage = weatherBox.querySelector('.custom-message');
      const humidity = document.querySelector('.info-humidity span');
      const wind = document.querySelector('.info-wind span');


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
      description.innerHTML = data.weather[0].description;
      customMessage.innerHTML = tempMessage;
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} Km/h`;

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

// Fetch weather data for default location
fetchWeather(39.8283, -84.8903);
