import {getMovies} from "./vendor/_API.js";

const API_KEY = getMovies;


class Movie {
  constructor(data) {
    this.title = data.Title;
    this.year = data.Year;
    this.imdbID = data.imdbID;
    this.poster = data.Poster;
  }

  render() {
    return `
    <div class="card">
        <img src="${this.poster}" alt="${this.title}">
        <h3>Name: ${this.title}</h3>
        <h4>Year: ${this.year}</h4>
        <h4>ImdbID: ${this.imdbID}</h4>
    </div>
    `;
  }
}

document.getElementById("btn").addEventListener("click",  (e) => {
  const movie = document.getElementById("movie").value.trim();


  const url = `https://omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movie)}`

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      if (data.Response === "True") {
        const movies = data.Search.map(item => new Movie(item));
        document.getElementById("out").innerHTML = movies.map(m => m.render()).join("");
      } else {
        document.getElementById("out").innerHTML = `<p>Ошибка: ${data.Error}</p>`;
      }
    } else {
      document.getElementById("out").innerHTML = `<p>Ошибка: ${xhr.status}</p>`;
    }
  };

  xhr.onerror = function () {
    document.getElementById("out").innerHTML = `<p>Ошибка сети</p>`;
  };

  xhr.send();
})
