let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idPelicula = qsObj.get("idPelicula"); /* <= el id de la pelicula a buscar */

let imagen_pp = document.querySelector("#img_pp")
let nombre_pp = document.querySelector("#nombre_pp")
let genero_pp = document.querySelector("#genero_pp")
let calificacion_pp= document.querySelector("#calificacion_pp")
let estreno_pp = document.querySelector("#estreno_pp")
let duracion_pp = document.querySelector("#duracion_pp")
let sinopsis_pp = document.querySelector("#sinopsis_pp")

let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let urldetallePelicula = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${APIkey}`


fetch(urldetallePelicula)
.then(function (res) {
    return res.json()
})
.then(function (data) {
    console.log(data);

    nombre_pp.innerText = data.title
    let seccion_pp = document.querySelector("#pelisPopulares");
    contenido_pp = ``
    seccion_pp.innerHTML = contenido_pp;
})
.catch(function (error) {
    console.log(error);
});