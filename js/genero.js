let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idGenero = qsObj.get("idGenero"); /* <= el id de la pelicula a buscar */
let nombreGenero = qsObj.get("name"); /* <= el id de la pelicula a buscar */
let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let tituloGenero = document.querySelector("#tituloGenero");
let urlGeneros_peliculas = `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=${idGenero}`;
let urlGeneros_series = `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=${idGenero}`;

tituloGenero.innerText = nombreGenero;

fetch(urlGeneros_peliculas)
.then(function (res) {
    return res.json()
})
.then(function (data) {
    let peliculas = data.results;
    console.log(peliculas);
    let peliculas_genero = document.querySelector("#peliculas_genero");
    let contenido_p = "";

    for (let i = 0; i < 6; i++) {
        let pelicula= peliculas[i];
        contenido_p += `<li>
                            <a href="./pelicula.html?idPelicula=${pelicula.id}">
                                <article class="art-home">
                                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="">
                                    <h3>${pelicula.title}</h3> 
                                </article>
                            </a> 
                        </li>`
    };
    peliculas_genero.innerHTML = contenido_p;
})
.catch(function (error) {
    console.log(error);
});


fetch(urlGeneros_series)
.then(function (res) {
    return res.json()
})
.then(function (data) {
    let series = data.results;
    let series_genero = document.querySelector("#series_genero");
    let contenido_s = "";

    for (let i = 0; i < 6; i++) {
        let serie= series[i];
        console.log(serie);
        contenido_s += `<a href="./pelicula.html?idPelicula=${serie.id}">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="">
                                <h3>${serie.name}</h3> 
                            </article>
                        </a>`  
    };
    series_genero.innerHTML = contenido_s;
})
.catch(function (error) {
    console.log(error);
});