let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let urlPeliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}`;
let urlSeriesValoradas = `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIkey}`;

/* Pelis populares */
fetch(urlPeliculasPopulares)
.then(function (res) {
    return res.json()
})
.then(function (data) {
    let peliculas = data.results;
    console.log(peliculas);
    let seccion_pp = document.querySelector("#pelisPopulares");
    let contenido_pp = "";

    for (let i = 0; i < 6; i++) {
        let pelicula= peliculas[i];
        contenido_pp += `<a href="pelicula.html">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="">
                                <h3>${pelicula.title}</h3> 
                                <p>Fecha de estreno: ${pelicula.release_date}</p>
                            </article>
                        </a>`  
    };
    seccion_pp.innerHTML = contenido_pp;
    
})
.catch(function (error) {
    console.log(error);
});

/* Series valoradas */
fetch(urlSeriesValoradas)
.then(function (res) {
    return res.json()
})
.then(function (data) {
    let seriesValoradas = data.results;
    console.log(seriesValoradas);
    let seccion_sv = document.querySelector("#seriesValoradas");
    let contenido_sv = "";

    for (let i = 0; i < 6; i++) {
        let seriesV= seriesValoradas[i]
        contenido_sv += `<a href="serie.html">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${seriesV.poster_path}" alt="">
                                <h3>${seriesV.name}</h3> 
                                <p>Fecha de estreno: ${seriesV.first_air_date}</p>
                            </article>
                        </a>`  
    }

    seccion_sv.innerHTML = contenido_sv;
})
.catch(function (error) {
    console.log(error);
});