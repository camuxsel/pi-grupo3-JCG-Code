let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idSeriesValoradas = qsObj.get("idSerie"); /* <= el id de la serie a buscar */
let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let tituloPagina_sv = document.querySelector("#tituloPagina_s");
let urldetalleSerie_v = `https://api.themoviedb.org/3/tv/${idSeriesValoradas}?api_key=${APIkey}&language=es-MX`;
console.log(urldetalleSerie_v);
let generos_s = "";

fetch(urldetalleSerie_v)
.then(function (res) {
    return res.json();
})
.then(function (data) {
    console.log(data);
    for (let i = 0; i < data.genres.length; i++) {
        let genero_serie = data.genres[i]
        generos_s += `<li class="generoB"><a href="./genero.html?idGenero=${genero_serie.id}" class="generoB link">${genero_serie.name}</a></li>`
        console.log(generos_s);
    }
    sectionSerie.innerHTML = `<img class="imgPelicula" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Poster Serie">
                                <div class="descripcion">
                                <ul class="ulPeli">
                                    <li>
                                    <h1 class="h1-serie">${data.original_name}</h1>
                                    <ul class="ulgeneroB">
                                        ${generos_s}
                                    </ul>
                                    <h2 class="h2-peliSerie"> <img class="imgEstrella" src="./imgs/estrella.png" alt="Estrella"> ${data.vote_average}/ 10 </h2>
                                    <h2 class="h2-peliSerie"><a class="favoritos" href="./favoritos.html">Agregar esta serie a favoritos.</a></h2>
                                    <h3 class="h3-peliSerie">Fecha de estreno: ${data.first_air_date}</h3>   
                                    <h3 class="h3-peliSerie sinopsis">${data.overview}</h3>            
                                    </li>
                                </ul>
                            </div>`
    

    tituloPagina_sv.innerText = data.name;
})
.catch(function (error) {
    console.log(error);
});
