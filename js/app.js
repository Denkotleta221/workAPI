import {getWeather} from './vendor/_API.js';

const API_KEY = getWeather;


class Weather {
  constructor(data) {
    this.city = data.name;
    this.temp = data.main.temp;
    this.description = data.weather[0].description;
    this.humidity = data.main.humidity;
    this.wind = data.wind.speed;
    this.icon = data.weather[0].icon;
  }

  render() {
    return `
        <img src="https://openweathermap.org/img/wn/${this.icon}@2x.png" alt="${this.description}">
        <h3>${this.city}</h3>
        <p><strong>${Math.round(this.temp)}°C</strong></p>
        <p>${this.description}</p>
        <p>Влажность: ${this.humidity}%</p>
        <p>Ветер: ${this.wind} м/с</p>
      `;
  }
}

document.getElementById("btn").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const weather = new Weather(data);
      document.getElementById("out").innerHTML = weather.render();
    } else {
      document.getElementById("out").innerHTML = `<p>Ошибка: ${xhr.status}</p>`;
    }
  };

  xhr.send();
});
