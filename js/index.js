let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let urlPeliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}`


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
        let pelicula= peliculas[i]
        contenido_pp += `<a href="pelicula.html">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="">
                                <h3>${pelicula.title}</h3> 
                                <p>Fecha de estreno: ${pelicula.release_date}</p>
                            </article>
                        </a>`  
    }

    seccion_pp.innerHTML = contenido_pp;
    
})
.catch(function (error) {
    console.log(error);
})