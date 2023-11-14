
let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let urlPeliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}`;
let urlSeriesPopulares = `https://api.themoviedb.org/3/tv/popular?api_key=${APIkey}`
let urlSeriesValoradas = `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIkey}`;

/*automatizacion para el carrusel*/
fetch(urlPeliculasPopulares)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    let carrusel = data.results;
    console.log(carrusel);
    let seccion_carrusel = document.querySelector("#ulCarrusel");
    let contenido_carrusel = "";

    for (let i = 0; i < 6; i++){
        let pelicula = carrusel[i];
        contenido_carrusel += `<li>
                                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Poster de ${pelicula.title} width="400" height="600" alt="">
                                </li>
                                `
    }
    seccion_carrusel.innerHTML = contenido_carrusel;
})
.catch(function (error) {
    
})


/*lo de peliculas*/
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
        contenido_pp += `<a href="./pelicula.html?idPelicula=${pelicula.id}">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Poster de ${pelicula.title}">
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
        contenido_sv += `<a href="./serie.html?idSerie=${seriesV.id}">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${seriesV.poster_path}" alt="Poster de ${seriesV.name}">
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


/*lo de series*/
fetch(urlSeriesPopulares)
.then(function(res){
    return res.json();
})

.then(function(data){
    let seriesPopulares = data.results;
    console.log(seriesPopulares);
    let seccion_sp = document.querySelector("#seriesP");
    let contenido_sp = "";

    for (let i = 0; i < 6; i++) {
        let seriePopular = seriesPopulares[i];
        contenido_sp += `<a href="serie.html?idSerie=${seriePopular.id}">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${seriePopular.poster_path}" alt="Poster de ${seriePopular.name}">
                                <h3>${seriePopular.name}</h3>
                                <p>Fecha de estreno: ${seriePopular.first_air_date} </p>
                             </article>
                        </a>`
                         
    };
    seccion_sp.innerHTML = contenido_sp;  
    })
    
.catch(function (error) {
    console.log(error);
});
