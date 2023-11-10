let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idPelicula = qsObj.get("idPelicula"); /* <= el id de la pelicula a buscar */
let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let tituloPagina_pp = document.querySelector("#tituloPagina_pp ")
let urldetallePelicula = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${APIkey}&language=es-MX`;

let generos_pp = ""

fetch(urldetallePelicula)
.then(function (res) {
    return res.json()
})
.then(function (data) {
    console.log(data);
    for (let i = 0; i < data.genres.length; i++) {
        let genero = data.genres[i]
        generos_pp += `<li class="generoB"><a href="./genero.html?idGenero=${genero.id}" class="generoB link">${genero.name}</a></li> `
        console.log(generos_pp);
    }
    section_pp.innerHTML = `<img class="imgPelicula" id="img_pp" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Foto de Barbie">
                            <div class="descripcion">
                                <ul class="ulPeli">
                                    <li>
                                    <h1 class="h1-peliSerie" id="nombre_pp">${data.title}</h1>
                                    <ul class="ulgeneroB" id="genero_pp">
                                        ${generos_pp}
                                    </ul>
                                    <h2 class="h2-peliSerie" id="calificacion_pp"> <img class="imgEstrella" src="./imgs/estrella.png" alt="Estrella"> ${data.vote_average} / 10 </h2>
                                    <h2 class="h2-peliSerie" id="favoritos_pp"><a class="favoritos" href="./favoritos.html">Agregar esta película a favoritos.</a></h2>
                                    <h3 class="h3-peliSerie" id="estreno_pp">Fecha de estreno: ${data.release_date}</h3>
                                    <h3 class="h3-peliSerie" id="duracion_pp">Duración: ${data.runtime}' </h3>
                                    <h3 class="h3-peliSerie sinopsis" id="sinopsis">${data.overview}</h3>
                                    </li><h2 class="h2-peliSerie" id="favoritos_pp"><a class="favoritos"> Ver recomendaciones </a></h2>
                                </ul>
                            </div>`
                            

    tituloPagina_pp.innerText = data.title;
})
.catch(function (error) {
    console.log(error);
});
