const container = document.querySelector('.weather__container');
const search = document.querySelector('.weather__search button');
const weatherInfo = document.querySelector('.weather__info');
const weatherDetails = document.querySelector('.weather__details');
const error404 = document.querySelector('.weather__error');

search.addEventListener('click', () => {

  const APIKey = '7e77c1b21fc21309dc876e113a919241';
  const city = document.querySelector('.weather__search input').value;

  if(city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => {

        if (json.cod === '404') {
          container.style.height = '360px';

          weatherInfo.style.display = 'none';
          weatherDetails.style.display = 'none';

          error404.style.display = 'block';
          error404.classList.add('fadeIn');

          return;

        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather__info img');
        const temperature = document.querySelector('.weather__info--temperature');
        const text = document.querySelector('.weather__info--text');

        const humidity = document.querySelector('.weather__details--humidity .weather__details--info span');
        const wind = document.querySelector('.weather__details--wind .weather__details--info span');
        

        switch (json.weather[0].main) {
          case 'Clear':
            image.src = 'img/clear-sky.png';
            break;

            case 'Clouds':
            image.src = 'img/nublado.png';
            break;

            case 'Rain':
            image.src = 'img/rain.png';
            break;

            case 'Storm':
            image.src = 'img/storm.png';
            break;

            case 'Haze':
            image.src = 'img/viento.png';
            break;
        
          default:
            image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        text.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        // weather__info.style.display = '';
        // weather__details.style.display = '';
        // weather__info.classList.add('fadeIn');
        // weather__details.classList.add('fadeIn');

        container.style.height = '520px';


      })


});